const express = require('express');
const cors = require('cors');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'templates', req.body.template, 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/generate-template', upload.fields([{ name: 'image1' }, { name: 'image2' }]), async (req, res) => {
    const { name, title, template, pColor, sColor } = req.body;
    const templateFolderPath = path.join(__dirname, 'templates', template);

    // Read the index.html template file
    const indexPath = path.join(templateFolderPath, 'index.html');
    const indexData = fs.readFileSync(indexPath, 'utf8');

    // Replace placeholders with actual values
    let modifiedIndex = indexData.replace('{{NAME}}', name).replace('{{TITLE}}', title);

    // Read the CSS file
    const cssPath = path.join(templateFolderPath, 'css', 'style.css');
    const cssData = fs.readFileSync(cssPath, 'utf8');

    // Replace color placeholders with actual colors
    const modifiedCSS = cssData.replace('{{PCOLOR}}', pColor).replace('{{SCOLOR}}', sColor);

    // Replace image placeholders with uploaded image paths
    if (req.files['image1'] && req.files['image1'].length > 0) {
        modifiedIndex = modifiedIndex.replace('{{IMAGE_PATH1}}', `img/${req.files['image1'][0].originalname}`);
    }
    
    if (req.files['image2'] && req.files['image2'].length > 0) {
        modifiedIndex = modifiedIndex.replace('{{IMAGE_PATH2}}', `img/${req.files['image2'][0].originalname}`);
    }


    // Create an archiver instance
    const zipStream = new require('stream').PassThrough();
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Pipe the archive stream to the response
    archive.pipe(zipStream);

    // Append modified index.html and style.css to the archive
    archive.append(modifiedIndex, { name: 'index.html' });
    archive.append(modifiedCSS, { name: 'css/style.css' });

    // Append the uploaded images to the archive
    if (req.files['image1'] && req.files['image1'].length > 0) {
        req.files['image1'].forEach(file => {
            archive.file(file.path, { name: `img/${file.originalname}` });
        });
    }

    if (req.files['image2'] && req.files['image2'].length > 0) {
        req.files['image2'].forEach(file => {
            archive.file(file.path, { name: `img/${file.originalname}` });
        });
    }

    // Append other files from the template folder recursively
    appendFilesRecursively(archive, templateFolderPath, templateFolderPath);

    // Finalize the archive
    archive.finalize();

    // Set response headers
    res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${name}-${template}-portfolio-template.zip"`
    });

    // Pipe the zip stream to the response
    zipStream.pipe(res);

    // Once the zip stream has been piped to the response, clear the img folder
    zipStream.on('finish', () => {
        try {
            const imgFolderPath = path.join(templateFolderPath, 'img');
            fs.readdirSync(imgFolderPath).forEach((file) => {
                fs.unlinkSync(path.join(imgFolderPath, file));
            });
            console.log('Images cleared from img folder.');
        } catch (err) {
            console.error('Error clearing img folder:', err);
        }
    });
});

function appendFilesRecursively(archive, folderPath, basePath) {
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const relativePath = path.relative(basePath, filePath);
        const stats = fs.statSync(filePath);
        if (stats.isFile() && file !== 'index.html' && !filePath.endsWith('.css')) {
            archive.file(filePath, { name: relativePath });
        } else if (stats.isDirectory()) {
            appendFilesRecursively(archive, filePath, basePath);
        }
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
