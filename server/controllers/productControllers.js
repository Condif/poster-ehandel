const Product = require("../models/productModel");
const ServerError = require("../serverError");

// Get all products
exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  if (products.length === 0) {
    throw new ServerError("There are no products", 404);
  }
  res.json(products);
};

// Create new peoduct
exports.createNewProduct = async (req, res) => {
  const product = new Product({
    price: req.body.price,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    inventory: req.body.inventory,
    cartAmount: req.body.cartAmount,
  });
  if (product.length === 0) {
    throw new ServerError("The product was not created", 400);
  }
  const newProduct = await product.save();
  res.status(201).json(newProduct);
};

// Update product
//TODO hur gör vi felhanteringen här??
exports.updateProduct = async (req, res) => {
  try {
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      {
        inventory: req.body.inventory,
      }
    );
    res.json("Product updated");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get products from category
exports.getProductsFromCategory = async (req, res) => {
  const products = await Product.find({
    category: req.params.productCategory,
  });
  if (products.length === 0) {
    throw new ServerError("The category does not exist", 404);
  }
  res.json(products);
};

// Get product by id
exports.getProductById = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.productId });
  if (!product) {
    throw new ServerError("The product does not exist", 404);
  }
  res.json(product);
};

//TODO hur gör vi felhanteringen här?
exports.updateProductStock = async (req, res) => {
  try {
    console.log("REQ.BODY: ", req.body);
    req.body.forEach(async (product) => {
      console.log("PRODUCT: ", product);
      await Product.updateOne(
        { _id: product._id },
        { $inc: { inventory: -product.cartAmount } }
      );
    });
    res.json("Product inventory updated");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
