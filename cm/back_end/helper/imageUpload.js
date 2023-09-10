const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your cloud name, API key, and API secret
cloudinary.config({ 
    cloud_name: "dfwnhzrqz", 
    api_key: '646453227562278', 
    api_secret: '7kxxL3VDiKrG3NWSJ6GS953BMf0' 
  });

// Function to upload a file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    // Upload the file to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(file.buffer);
  });
};

module.exports = {
    uploadToCloudinary,
  };

