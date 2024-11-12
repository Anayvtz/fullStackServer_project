const express = require("express");
const multer = require('multer');
const path = require('path'); // Import the path module

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
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    // Construct the image URL
    const imageUrl = `/images/${req.file.filename}`;

    res.json({ imageUrl });  // Send back the image URL
});
module.exports = router;