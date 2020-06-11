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
  console.log(req.body);
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

//Update productstock when items are sold
exports.updateProductStock = async (req, res) => {
  let products = req.body;
  for (const product of products) {
    const productInStock = await Product.findOne({ _id: product._id });
    if (!productInStock) {
      throw new ServerError("No such product in stock", 404);
    }
    let currentAvalible = productInStock.inventory - product.cartAmount;
    product.inventory = currentAvalible;
    product.cartAmount = 0;

    const updatedProduct = new Product(Object.assign(productInStock, product));
    await updatedProduct.save();
  }
  res.json("Product updated");
};
