import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
console.log(" Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      quality: "auto",
      folder:"recipe-cards"
    });
    console.log("Cloudinary response:", response); // Add this

    console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(file);
    // Deletes the file named 'temp.txt' in the current directory
    //  When uploading an image to Cloudinary or any other cloud
    // storage service, you may need to delete the local copy of
    // the file after a successful upload. Here's why:

    return {
      url: response.url,
      public_id: response.public_id,
    }
  } catch (error) {
    if(fs.existsSync(file)){
      fs.unlinkSync(file);

    }
    console.error("Cloudinary upload failed:", error);
    throw new Error("Cloudinary upload failed");
  }
};
export { uploadOnCloudinary };
