const mongoose = require("mongoose");
const ServerError = require("../serverError");
const Product = require("../models/productModel");

let gfs;

/** Set connection to GridFs */
exports.setConnection = (gfsConnection) => {
  return new Promise((resolve, reject) => {
    gfs = gfsConnection;

    if (gfs === undefined) {
      reject({ reason: gfs });
      throw new ServerError("GridFsStream is not initialized", 500);
    }
    resolve({ gfs });
  });
};

/**
 * Get image from GridFs by product id
 * @param {Request} req
 * @param {Response} res
 */
exports.getImageByProduct = async (req, res) => {
  const product = await Product.findOne({
    _id: mongoose.Types.ObjectId(req.params.productId),
  });
  if (!product) {
    throw new ServerError("Product with requested id does not exist", 404);
  }
  this.getImageById(req, res, product.imageId);
};

/**
 * Get image from GridFs by image id
 * @param {Request} req
 * @param {Response} res
 * @param {import("mongoose").Schema.Types.ObjectId | string} imageId
 */
exports.getImageById = async (req, res, imageId) => {
  // Set id to find
  let id;
  if (req.params._id === undefined) {
    id = imageId;
  } else {
    id = req.params._id;
  }

  // Search for ObjectId in images.files
  // -- specify ObjectId type, otherwise it is not recognized as a valid ObjectId
  // -- convert response to array
  const image = await gfs.find({ _id: mongoose.Types.ObjectId(id) }).toArray();

  // Check if image was found
  if (image.length === 0) {
    throw new ServerError("Image was not found", 404);
  }

  // Set response content-type
  // -- set content-type to image/jpeg or image/png otherwise response is base64 string and not an image file
  if (image[0].contentType === undefined) {
    res.set("Content-Type", "image/jpeg");
  } else {
    res.set("Content-Type", image[0].contentType);
  }

  // Create download stream to stream image to client from GridFs
  const downloadStream = gfs.openDownloadStream(image[0]._id);

  // Write every image base64-chunk when data (chunk) is recieved
  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  // Catch errors on error event
  downloadStream.on("error", (error) => {
    throw new ServerError(`Error occured on download stream. ${error}`, 500);
  });

  // End response when stream has finished
  downloadStream.on("end", () => {
    res.end();
  });
};
