const Order = require("../models/orderModel");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders || !orders.length) {
      const error = new Error("Orders does not exist");
      error.statusCode = 400;
      throw error;
    }
    res.json(orders);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: err.message });
    // throw new Error("Some shit...");
  }
};

exports.getOrderByUserId = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params._id }); //.populate("user");
    if (!order) {
      const error = new Error("Orders does not exist");
      error.statusCode = 400;
      throw error;
    }

    console.log("detta blir order", order);
    res.status(200).json(order);
  } catch (error) {
    // res.status(500).json({ message: err.message })
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  const newOrder = req.body;
  try {
    const orderDoc = new Order(newOrder);
    //Här ska errorhanteringen in
    const savedOrder = await orderDoc.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
