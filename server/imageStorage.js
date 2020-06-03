const mongoose = require("mongoose")
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const GridFsBucket = mongoose.mongo.GridFSBucket;
const slugify = require("slugify");
const { setConnection } = require("./controllers/imageControllers");
const ServerError = require('./serverError');

const options = { bucketName: 'images' };

exports.imageStorage = async (db) => {
    const gfs = new GridFsBucket(db.db, options);
    const connect = await setConnection(gfs);
    if (connect === undefined) {
        throw new ServerError(`Failed to connect to ${connect.reason}`, 500)
    }
}

const storage = new GridFsStorage({
    url: "mongodb+srv://anonymous_chinchilla:anonymous_chinchilla@poster-ehandel-savbu.mongodb.net/poster-ehandel",
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filenameWithExtension = `${slugify(JSON.parse(req.body.productBody).name, { lower: true })}${(".").concat(file.mimetype.split("/").pop())}`
            const fileInfo = {
                filename: filenameWithExtension,
                bucketName: 'images'
            }
            resolve(fileInfo);
        })
    },
});

exports.upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 500,
        files: 1
    },
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.includes("image/jpeg" || !file.mimetype.includes("image/png"))) {
            cb(new ServerError("Only .jpeg and .png formats are allowed"), false)
        }
        console.log("Successfully uploaded image to mongodb")
        cb(null, true)
    }
});