const express = require("express");
const multer = require("multer");
const File = require("../models/File");
const path = require("path"); // Import the 'path' module

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route to handle file uploads
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname } = req.file;

    // Save the file's original name and generated filename to the database
    const newFile = new File({
      originalName: originalname,
      filename: req.file.filename,
    });
    await newFile.save();

    return res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
