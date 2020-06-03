const mongoose = require("mongoose");
const ServerError = require("../serverError");
const Product = require("../models/productModel");

let gfs;

/** Set connection to GridFs */
exports.setConnection = (gfsConnection) => {
    return new Promise((resolve, reject) => {
        gfs = gfsConnection;

        if (gfs === undefined) {
            reject({ reason: gfs })
            throw new ServerError("GridFsStream is not initialized", 500);
        }
        resolve({ gfs });
    })
}

/**
 * Get image from GridFs by product id
 * @param {Request} req
 * @param {Response} res
 */
exports.getImageByProduct = async (req, res) => {
    const product = await Product.findOne({ _id: mongoose.Types.ObjectId(req.params.productId) });
    if (!product) {
        throw new ServerError("Product with requested id does not exist", 404)
    }
    this.getImageById(req, res, product.imageId);
}

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
    } else { id = req.params._id }

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
        res.set('Content-Type', 'image/jpeg');
    } else { res.set('Content-Type', image[0].contentType) }

    // Create download stream to stream image to client from GridFs
    const downloadStream = gfs.openDownloadStream(image[0]._id);

    // Write every image base64-chunk when data (chunk) is recieved
    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    // Catch errors on error event
    downloadStream.on('error', (error) => {
        throw new ServerError(`Error occured on download stream. ${error}`, 500);
    });

    // End response when stream has finished
    downloadStream.on('end', () => {
        console.log("Finished streaming image to client");
        res.end();
    });
}



/*
    gfs.findOne({ _id: req.params._id }, function (error, file) {
        if (!file || file.length === 0) {
            throw new ServerError("No image file was found", 404);
        }
        if (file.contentType === "image/jpeg" || file.contentType === "image/png" || file.contentType === "image/jpg") {
            const readStream = gfs.createReadStream({ _id: req.params._id });
            return readStream.pipe(res);
        } else {
            throw new ServerError("File is not an image", 400);
        }
    })
    */

// res.json(image)

/*
let readStream = fs.createReadStream(path.join(__dirname, 'coral.jpg'))
readStream.pipe(res)
Ladda ner bild
gfs.openDownloadStreamByName("coral.jpg")
    .pipe(fs.createWriteStream('output.jpg'))
    .on("error", function(error) {
        console.log("NOOO ERROR: ", error)
    })
    .on("finish", function() {
        console.log("read!")
    })
    res.setHeader('Content-Type', 'image/jpeg')
*/
/*
const p = path.join(__dirname, 'coral.jpg')
fs.createReadStream(p)
    .pipe(gfs.openUploadStream("coral.jpg"))
    .on("error", function(error) {
        console.log("WOOPS! ERROR: ", error)
    })
    .on("finish", function() {
        console.log("done!")
    })
*/
/*
 if (!files || files.length === 0) {
            res.json("No files found")
        } else {
            const f = files.map(file => {
                if (file.contentType === "image/png" || file.contentType === "image/jpeg") {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
                return file;
            })
                console.log(f)
            return res.json({
                files: f
            })
        }
*/

    // res.end()

