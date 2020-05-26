const Order = require("../models/orderModel");
const ServerError = require("../serverError");

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (!orders || !orders.length) {
    throw new ServerError("The source does not exist", 404);
  }
  res.json(orders);
};

exports.getOrderByUserId = async (req, res) => {
  const order = await Order.findOne({ _id: req.params._id }); //.populate("");
  if (!order || order == []) {
    throw new ServerError("Order does not exist", 404);
  }
  res.status(200).json(order);
};

exports.createOrder = async (req, res) => {
  const newOrder = req.body;
  const orderDoc = new Order(newOrder);
  if (!orderDoc) {
    throw new ServerError("The order does not exist", 400);
  }
  const savedOrder = await orderDoc.save();
  res.status(200).json(savedOrder);
};
