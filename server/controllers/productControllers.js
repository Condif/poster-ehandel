const Product = require("../models/productModel");
const ServerError = require("../serverError");
const { upload } = require("../imageStorage");

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
  if (req.file === undefined) {
    throw new ServerError("Image file is missing", 400);
  }

  const body = JSON.parse(req.body.productBody);
  const file = req.file;

  const product = new Product({
    price: body.price,
    name: body.name,
    category: body.category,
    description: body.description,
    inventory: body.inventory,
    cartAmount: body.cartAmount,
    imageId: file.id,
  });

  const newProduct = await product.save();
  res.status(201).json(newProduct);
};

// Update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new ServerError("Product does not exist", 404);
  }

  if (req.params.productId !== req.body._id) {
    throw new ServerError("You can not update product", 403);
  }
  const updatedProduct = new Product(Object.assign(product, req.body));
  await updatedProduct.save();

  res.json("Product updated");
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

//Update productstock when items are sold
exports.updateProductStock = async (req, res) => {
  let products = req.body;
  console.log(products, "här är products");
  // if (products.length === 0 || Object.keys(products) == 0) {
  //   throw new ServerError("The product does not exist", 404);
  // }
  products.forEach(async (product) => {
    const productInStock = await Product.findOne({ _id: product._id });
    if (!productInStock) {
      throw new ServerError("No such product in stock", 404);
    }
    console.log("PRODUCT: ", productInStock);
    let currentAvlible = productInStock.inventory - product.cartAmount;
    console.log(currentAvlible, "Current");
    product.inventory = currentAvlible;
    product.cartAmount = 0;

    const updatedProduct = new Product(Object.assign(productInStock, product));
    console.log(updatedProduct, "uppdateringen");
    await updatedProduct.save();
  });
  res.json("Product inventory updated");
};
