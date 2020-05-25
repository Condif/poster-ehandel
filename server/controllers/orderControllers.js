const Order = require("../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params._id }).populate("user");
    console.log("detta blir order", order);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const newOrder = req.body;
  try {
    const orderDoc = new Order(newOrder);
    const savedOrder = await orderDoc.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
