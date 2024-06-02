const express = require('express');
const cors = require('cors');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Grassroot");


app.get('/', (req, res) => {
    res.send('Hello, Template generator here!');
});

// -----------------------added username and password-------------------------------------

// const users = [
//     { username: 'dj363', password: '123', email: 'dj@gmail.com' },
//     { username: 'hey', password: '123', email: 'hey@gmail.com' },
//     { username: 'user1', password: 'password1', email: 'user1@example.com' },
//     { username: 'user2', password: 'password2', email: 'user2@example.com' },
//     // Add more user data as needed
// ];

// async function hashPasswordsAndInsert() {
//     try {
//         const saltRounds = 10;

//         // Hash passwords for each user
//         const usersWithHashedPasswords = await Promise.all(users.map(async (user) => {
//             const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//             return { ...user, password: hashedPassword };
//         }));

//         // Insert users with hashed passwords into the database
//         await userModel.insertMany(usersWithHashedPasswords);

//         console.log('Passwords hashed and users inserted successfully.');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Execute the function
// hashPasswordsAndInsert();

// -----------------------------------------------------------------------

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
  
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        const isValidPassword = await bcrypt.compare(password, user.password);
  
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
  

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            secretKey,
        );  
  
        // Send the token in response
        res.json({ token });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// For Generating the Template
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'templates', req.body.template, 'Vora-Skyline', 'marina-enclave', 'image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });



app.post('/generate-template', upload.fields([{ name: 'bannerImages'}, { name: 'galleryImages' }, { name: 'floorPlanImg' },{ name: 'titleIcon' },{ name: 'navbarLogo' },{name: 'reraImg' }]), async (req, res) => {
    const {metaKeywords, metaDescription, navbarName, navbarAlt, title, bannerAlt, projectName, location, landArea, residencies, amenitiesHighlight, highlighter1, highlighter2, highlighter3, onwards, overview, template, primaryColor, secondaryColor, contact, amenities, typeAndCarpetArea, floorPlan, floorImgEffect, floorPlanAlt, galleryImagesAlt, mapIframe, mapNearby, reraAlt, reraNo } = req.body;

    // Path to save template files and images
    const templateFolderPath = path.join(__dirname, 'templates', template);

    // Create an archiver instance
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Set response headers
    res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${navbarName}-${template}-template.zip"`
    });

    // Pipe the zip stream directly to the response
    archive.pipe(res);

    // Read the index.html template file
    const indexPath = path.join(templateFolderPath, 'Vora-Skyline', 'marina-enclave', 'Default.aspx');
    let indexData = fs.readFileSync(indexPath, 'utf8');

    // Replace placeholders with actual values
            indexData = indexData.replace('{{NAVBAR_NAME}}', navbarName).replace(/{{TITLE}}/g, title).replace('{{META_KEYWORDS}}', metaKeywords).replace('{{META_DESCRIPTION}}', metaDescription).replace(/{{PROJECT_NAME}}/g, projectName).replace('{{NAVBAR_ALT}}',navbarAlt).replace('{{LOCATION}}', location).replace('{{LAND_AREA}}',landArea).replace('{{RESIDENCIES}}',residencies).replace('{{AMENITIES_HIGHLIGHT}}',amenitiesHighlight).replace('{{HIGHLIGHTER1}}',highlighter1).replace('{{HIGHLIGHTER2}}',highlighter2).replace('{{HIGHLIGHTER3}}',highlighter3).replace('{{ONWARDS}}',onwards).replace('{{OVERVIEW}}', overview).replace('{{MAP_IFRAME}}',mapIframe).replace('{{RERA_Alt}}', reraAlt).replace('{{RERA_NO}}', reraNo).replace(/{{CONTACT}}/g, contact);

    if (req.files['titleIcon'] && req.files['titleIcon'].length > 0) {
        indexData = indexData.replace('{{TITLE_ICON}}', `image/${req.files['titleIcon'][0].originalname}`);
    } else{
        indexData = indexData.replace('{{TITLE_ICON}}', ' ');
    }
    
    if (req.files['navbarLogo'] && req.files['navbarLogo'].length > 0) {
        indexData = indexData.replace('{{NAVBAR_LOGO}}', `image/${req.files['navbarLogo'][0].originalname}`);
    }

    let bannerHTML = '';
    let bannerCarouselIndicatorHTML = '';

    const bannerAltList = bannerAlt.split(',').map(item => item.trim());
    if (req.files['bannerImages'] && req.files['bannerImages'].length > 0) {
        req.files['bannerImages'].forEach((image, index) => {
           
            let carouselIndicator = index === 0 ? `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="active"></li>` : `<li data-target="#carouselExampleIndicators" data-slide-to="${index}"></li>`;

            bannerCarouselIndicatorHTML += carouselIndicator;

            const bannerAltText = bannerAltList[index];
            const carouselItemClass = index === 0 ? 'carousel-item active' : 'carousel-item';
            bannerHTML += `<div class="${carouselItemClass}"><img src="image/${image.originalname}" class="d-block w-100 resposive_height img_top" width="800" height="700" alt="${bannerAltText}"></div>`;
        })
    }
    indexData = indexData.replace("{{BANNER_CAROUSEL_INDICATOR}}",bannerCarouselIndicatorHTML)
    indexData = indexData.replace('{{BANNER_IMAGES}}', bannerHTML);

    // Add amenities dynamically
    const amenitiesList = amenities.split(',').map(item => item.trim());
    let amenitiesHTML = '';
    amenitiesList.forEach(amenity => {
        amenitiesHTML += `<div class="col-md-4 my-2"><i class="far fa-hand-point-right icon_style"></i>${amenity}</div>`;
    });

    // Append amenities HTML to the indexData
    indexData = indexData.replace('{{AMENITIES_PLACEHOLDER}}', amenitiesHTML);

    // Add gallery images dynamically
    let galleryImagesHTML = '';
    let galleryCarouselIndicatorHTML = '';
    const galleryImagesAltList = galleryImagesAlt.split(',').map(item => item.trim());

    if (req.files['galleryImages'] && req.files['galleryImages'].length > 0) {
        req.files['galleryImages'].forEach((image, index) => {
            const galleryAltText = galleryImagesAltList[index];
            // Check if it's the first image
            const carouselItemClass = index === 0 ? 'carousel-item active' : 'carousel-item';

            const carouselIndicator = index === 0 ? `<li data-target="#carouselExampleIndicators1" data-slide-to="${index}" class="active"></li>` : `<li data-target="#carouselExampleIndicators1" data-slide-to="${index}"></li>`;

            galleryCarouselIndicatorHTML += carouselIndicator;

            galleryImagesHTML += `<div class="${carouselItemClass}">
            <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="100%" height="400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="${galleryAltText}">
                <title>${galleryAltText}</title>
                <defs>
                    <clipPath id="gsl1">
                        <rect width="100%" height="100%" fill="#555"></rect>
                    </clipPath>
                    <text x="50%" y="50%" fill="#333" dy=".3em">${galleryAltText}</text>
                </defs>
                <image width="100%" height="100%" xlink:href="/image/${image.originalname}" clip-path="url(#gsl1)" alt="${galleryAltText}" />
            </svg>
        </div>`;
        });
    }

    // Append gallery images HTML to the indexData
    indexData = indexData.replace('{{GALLERY_CAROUSEL_INDICATOR}}', galleryCarouselIndicatorHTML)
    indexData = indexData.replace('{{GALLERY_IMAGES}}', galleryImagesHTML);


    // Add Type and CarpetArea dynamically
    let  typeAndCarpetAreaHTML = '';
    typeAndCarpetArea.forEach(item =>{
        const price = item.price !== 'undefined' ? `${item.price}` : '';
        typeAndCarpetAreaHTML += `<tr>
        <td style="text-align:center;">${item.type} </td>
        <td style="text-align:center;">${item.carpetArea} SQ.FT</td>
        <td style="text-align:center;">&#8377;${price} On Request <br> &nbsp;&nbsp;<button type="button" class="btn btn-success effetMoveGradient btn-sm" data-toggle="modal" data-target="#myModal"  data-title="Send Me Pricing Details" id="price_equ">Price Breakup</button></td>
    </tr> `;
    });

    indexData = indexData.replace('{{TYPE_AND_CARPET_AREA}}', typeAndCarpetAreaHTML);

    // Add floor plans dynamically
    let floorPlanHTML = '';
    const floorPlanList = floorPlan.split(',').map(item => item.trim());
    const floorPlanAltList = floorPlanAlt.split(',').map(item => item.trim());

    if (req.files['floorPlanImg'] && req.files['floorPlanImg'].length > 0) {
        req.files['floorPlanImg'].forEach((image, index) => {
            // Get the corresponding floor plan text
            const floorPlanText = floorPlanList[index];
            const floorPlanAltText = floorPlanAltList[index];

            const imageEffectStyle = floorImgEffect === 'blur' ? 'style="filter: blur(4px); -webkit-filter: blur(4px);"' : '';

            // Generate HTML for each floor plan item
            floorPlanHTML += `<div class="col-md-4" style="margin-bottom: 10px;">
                <div class="card1">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="${floorPlanText}">
                        <title>${floorPlanText}</title>
                        <defs>
                            <clipPath id="clip-path-${floorPlanText}">
                                <rect width="100%" height="100%" fill="#868e96"></rect>
                                <text x="35%" y="50%" fill="#dee2e6" dy=".3em">${floorPlanText}</text>
                            </clipPath>
                        </defs>
                        <image ${imageEffectStyle} width="100%" height="100%" xlink:href="image/${image.originalname}" clip-path="url(#clip-path-${floorPlanText})"  alt="${floorPlanAltText}" />
                    </svg>
                    <div class="p-2 bg-success effetMoveGradient text-center aq">
                        <h5 class="card-title text-light">${floorPlanText}</h5>
                    </div>
                    <div class="overlay">
                        <div class="text overlay-text" data-toggle="modal" data-target="#myModal"  data-title="Send Me Floor Plan Details" id="floorplan">ENQUIRE NOW</div>
                    </div>
                </div>
            </div>`;
        });
    }

    indexData = indexData.replace('{{FLOORPLAN}}', floorPlanHTML);

    // Add Map Nearby dynamically
    const mapNearbyList = mapNearby.split(',').map((item) => item.trim());
    let mapNearbyHTML = "";
    mapNearbyList.forEach(nearBy => {
        mapNearbyHTML += `<div class="my-2" style="overflow-x:unset;">
        <span class="dots"><i class="fa fa-circle"></i></span>${nearBy}
    </div>`;
    })

    indexData = indexData.replace("{{MAP_NEARBY}}",mapNearbyHTML)

    // Replace Rera image placeholders with uploaded image paths
    if (req.files['reraImg'] && req.files['reraImg'].length > 0) {
        indexData = indexData.replace('{{RERA_IMAGE}}', `image/${req.files['reraImg'][0].originalname}`);
    } else{
        indexData = indexData.replace('{{RERA_IMAGE}}', ' ');
    }


     // Read the CSS file
     const cssPath = path.join(templateFolderPath, 'Vora-Skyline', 'marina-enclave', 'css', 'bt.css');
     const cssData = fs.readFileSync(cssPath, 'utf8');
 
     // Replace color placeholders with actual colors
     const modifiedCSS = cssData.replace(/PRIMARYCOLOR/g, primaryColor).replace(/SECONDARYCOLOR/g, secondaryColor);

     // Read the Default.aspx.cs template file
    const jsPath = path.join(templateFolderPath, 'Vora-Skyline', 'marina-enclave', 'Default.aspx.cs');
    let jsData = fs.readFileSync(jsPath, 'utf8');
    jsData = jsData.replace(/{{TITLE}}/g, title);

 

    // Append modified index.html and style.css directly to the archive
    archive.append(indexData, { name: 'vora-skyline/marina-enclave/Default.aspx' });
    archive.append(jsData, { name: 'Vora-Skyline/marina-enclave/Default.aspx.cs' });
    archive.append(modifiedCSS, { name: 'vora-skyline/marina-enclave/css/bt.css' });
   

    // Append template files to the archive
    appendFilesRecursively(archive, templateFolderPath, templateFolderPath);

    // Finalize the archive
    await archive.finalize();

    clearImageFolder(path.join(__dirname, 'templates', req.body.template, 'Vora-Skyline', 'marina-enclave', 'image'));

});

function appendFilesRecursively(archive, folderPath, basePath) {
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const relativePath = path.relative(basePath, filePath);
        const stats = fs.statSync(filePath);
        if (stats.isFile() && file !== 'Default.aspx' && file !== 'Default.aspx.cs' && file !== 'bt.css') {
            archive.file(filePath, { name: relativePath });
        } else if (stats.isDirectory()) {
            appendFilesRecursively(archive, filePath, basePath);
        }
    });
}

function clearImageFolder(folderPath) {
    // Function to clear contents of the image folder
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        fs.unlinkSync(filePath); // Remove the file
    });
}


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
