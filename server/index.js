// index.js
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

        const output = fs.createWriteStream(`./public/${name}-${template}-portfolio-template.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        archive.pipe(output);
        archive.append(modifiedTemplate, { name: 'index.html' });
        archive.finalize();

        const downloadLink = `http://localhost:3001/${name}-${template}-portfolio-template.zip`;
        res.json({ downloadLink });
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
