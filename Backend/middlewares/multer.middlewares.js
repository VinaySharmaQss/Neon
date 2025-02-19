import multer from "multer";
import path from "path";
import fs from "fs";

// Define the destination path using an absolute path
const imagesPath = path.join(process.cwd(), "public", "Images");

// Ensure the directory exists
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });
