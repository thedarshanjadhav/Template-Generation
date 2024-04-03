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
        const template = req.body.template; // Get the template name from request body
        const imgFolderPath = path.join(__dirname, 'templates', template, 'img');
        // Remove existing files in the img folder
        fs.readdir(imgFolderPath, (err, files) => {
            if (err) {
                console.error('Error reading img folder:', err);
                return cb(err);
            }
            files.forEach((file) => {
                fs.unlinkSync(path.join(imgFolderPath, file));
            });
            cb(null, imgFolderPath);
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/generate-template', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
    const { name, title, template, pColor, sColor } = req.body;
    const templateFolderPath = path.join(__dirname, 'templates', template);

    // Read the index.html template file
    const indexPath = path.join(templateFolderPath, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, indexData) => {
        if (err) {
            console.error('Error reading index.html file:', err);
            return res.status(500).json({ error: 'Error reading index.html file' });
        }

        // Replace placeholders with actual values
        let modifiedIndex = indexData.replace('{{NAME}}', name).replace('{{TITLE}}', title);

        // Read the CSS file
        const cssPath = path.join(templateFolderPath, 'css', 'style.css');
        fs.readFile(cssPath, 'utf8', (err, cssData) => {
            if (err) {
                console.error('Error reading style.css file:', err);
                return res.status(500).json({ error: 'Error reading style.css file' });
            }

            // Replace color placeholders with actual colors
            const modifiedCSS = cssData.replace('{{PCOLOR}}', pColor).replace('{{SCOLOR}}', sColor);

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
                    const image1Path = path.join(templateFolderPath, 'img', file.originalname);
                    archive.file(image1Path, { name: `img/${file.originalname}` });
                });
            }

            if (req.files['image2'] && req.files['image2'].length > 0) {
                req.files['image2'].forEach(file => {
                    const image2Path = path.join(templateFolderPath, 'img', file.originalname);
                    archive.file(image2Path, { name: `img/${file.originalname}` });
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
        });
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
