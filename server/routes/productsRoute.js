const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const controller = require("../controllers/productControllers");
// const getUser = require("../Middlewares/getUser.js");

// Getting all
router.get("/", controller.getAllProducts);

// Creating new post
router.post("/", controller.createNewProduct);

// Update a product
router.put("/:productId", controller.updateProduct);

// Get all products in a category
router.get("/:productCategory", controller.getProductsFromCategory);

// Get one specific product
router.get("/:productId", controller.getProductById);

module.exports = router;
