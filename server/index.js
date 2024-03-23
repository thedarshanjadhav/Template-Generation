const express = require('express');
const cors = require('cors');
const fs = require('fs');
const archiver = require('archiver');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/generate-template', (req, res) => {
    const { name, template } = req.body;
    const templateFilePath = `./templates/${template}/index.html`;

    fs.readFile(templateFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading template file:', err);
            return res.status(500).json({ error: 'Error reading template file' });
        }

        const modifiedTemplate = data.replace('{{NAME}}', name);

        // Create an in-memory stream for the ZIP file
        const zipStream = new require('stream').PassThrough();

        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        // Pipe the archive to the in-memory stream
        archive.pipe(zipStream);
        archive.append(modifiedTemplate, { name: 'index.html' });
        archive.finalize();

        // Set the appropriate headers for the response
        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${name}-${template}-portfolio-template.zip"`
        });

        // Pipe the in-memory stream to the response
        zipStream.pipe(res);
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
