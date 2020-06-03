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
    imageId: file.id
  });
  // if (Product.va) {
  //   throw new ServerError("The product was not created", 400);
  // }

  const newProduct = await product.save();
  res.status(201).json(newProduct);

};

// Update product
//TODO hur gör vi felhanteringen här??
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    throw new ServerError("Product does not exist", 404);
  }

  if (req.params.productId !== req.body._id) {
    throw new ServerError("Forbidden!", 403);
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
