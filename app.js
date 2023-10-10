const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const fileUploadRoute = require("./routes/fileUpload");
const cors = require("cors");

const app = express();
app.use(cors());

// Configure CORS middleware for a specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the actual URL of your React app
  })
);

// Connect to MongoDB (replace 'your-mongodb-url' with your actual MongoDB URL)
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://sreehari:Wub2Tpul7BBeWsYJ@cluster0.wm00gla.mongodb.net/"
  )
  .then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  })
  .catch((error) => {
    console.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  });

app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Use the fileUploadRoute for handling file uploads
app.use("/upload", fileUploadRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
