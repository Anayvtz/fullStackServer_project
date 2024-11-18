const express = require("express");
const multer = require('multer');
const path = require('path'); // Import the path module
const YarnModel = require("../DB/mongodb/models/Yarn");
const { findStockByYarnId, updateStock, updateStockImage } = require("../dataAccess/stockDataAccessService");

const router = express.Router();

const imagesDir = path.resolve(__dirname, '..', 'public', 'images'); // Go up one level (..) from the current router file
// Set up multer for storing uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDir);  // Upload to /public/images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    },
});

const upload = multer({ storage: storage });
// Handle image upload route
router.post('/upload-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    console.log("router.post('/upload-image' req.body:", req.body);

    // Image URL to be saved in the MongoDB database
    const imageUrl = `/images/${req.file.filename}`;

    // Assuming you're updating an existing yarn document with the image URL
    const yarnId = req.body.yarnId;  // Get the yarnId from the request body (or params)

    try {
        console.log("router.post('/upload-image'. yarnId:", yarnId);
        console.log("router.post('/upload-image'. imageUrl:", imageUrl);

        // Find the yarn document and update it with the image URL
        const updatedYarn = await YarnModel.findById(yarnId);
        updatedYarn.image.imageurl = imageUrl;
        console.log("router.post('/upload-image'. updatedYarn.image.imageurl:", updatedYarn.image.imageurl);
        updatedYarn.save();
        if (!updatedYarn) {
            return res.status(404).send({ error: 'Yarn not found' });
        }
        let stock = await findStockByYarnId(yarnId);
        console.log("after findStockByYarnId stock.image:", stock.image)
        stock.image.imageurl = imageUrl;
        stock.image.alt = updatedYarn.image.alt;

        await updateStockImage(stock._id, stock)
        // Send the updated image URL back in the response
        res.send({ imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;