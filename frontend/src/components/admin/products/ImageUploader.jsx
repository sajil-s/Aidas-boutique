import { useState } from "react";
import { uploadImages } from "../../../services/uploadService.js";

function ImageUploader({ imageUrls, setImageUrls }) {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploading(true);

      const data = await uploadImages(formData);

      setImageUrls((prev) => [
        ...prev,
        ...data.imageUrls,
      ]);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">
          Product Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {uploading && (
        <p className="text-blue-600">
          Uploading images...
        </p>
      )}

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Product"
              className="w-24 h-24 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;