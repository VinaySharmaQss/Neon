import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (localpath) => {
  try {
    if (!localpath) {
      console.log("Please provide a valid path");
      return "Please provide a valid path";
    }

    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
      use_filename: true,
      folder: "Neon",
    });

    fs.unlinkSync(localpath);

    return response; 
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Image upload failed" };
  }
};
