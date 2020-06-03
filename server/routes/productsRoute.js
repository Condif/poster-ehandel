const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const controller = require("../controllers/productControllers");
// const getUser = require("../Middlewares/getUser.js");
const {upload} = require('../imageStorage')

// Getting all
router.get("/", controller.getAllProducts);

// Creating new post
router.post("/", upload.single('image'), controller.createNewProduct);

// Update a product
router.put("/:productId", controller.updateProduct);

// Get all products in a category
router.get("/category/:productCategory", controller.getProductsFromCategory);

// Get one specific product
router.get("/product/:productId", controller.getProductById);

router.put("/", controller.updateProductStock);

module.exports = router;
