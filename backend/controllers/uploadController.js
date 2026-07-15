import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image",
      });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "aidas-products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "Images uploaded successfully",
      imageUrls,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { uploadImages };