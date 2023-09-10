const { uploadToCloudinary } = require("../helper/imageUpload");
const {setImageUrl,getImageUrl} = require('../helper/imageUrl')

exports.uploadtoCloudinarymiddleware = (req, res, next) => {

  try {
    // Access the uploaded file
    const file = req.file;

    // Process and handle the data as needed
    console.log("Uploaded file:", file);

    uploadToCloudinary(file)
      .then((result) => {
        // console.log("File uploaded to Cloudinary:", result);
        url = result;
        const imageurl = url.url;
        setImageUrl(imageurl); // Set the imageurl
        console.log(
          "------------------------------------------------------------------"
        );
        console.log(imageurl);
        // Send a response back to the client
        // res.status(200).json({ message: "Data received successfully." });
      })
      .catch((error) => {
        console.error("Error uploading file to Cloudinary:", error);
      });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Server error." });
  }

//   next(); // Call next() to continue processing if there are no errors
};

