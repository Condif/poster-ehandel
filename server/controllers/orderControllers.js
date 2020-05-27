const Order = require("../models/orderModel");
const ServerError = require("../serverError");

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (orders.length === 0) {
    throw new ServerError("There are no orders", 404);
  }
  res.json(orders);
};

exports.getOrderByUserId = async (req, res) => {
  const order = await Order.findOne({ _id: req.params._id }); //.populate("");
  if (!order) {
    throw new ServerError("Order does not exist", 404);
  }
  res.status(200).json(order);
};

exports.createOrder = async (req, res) => {
  const newOrder = req.body;
  if (!newOrder || newOrder.length === 0) {
    throw new ServerError("The order was not created", 400);
  }
  const orderDoc = new Order(newOrder);
  const savedOrder = await orderDoc.save();
  res.status(200).json(savedOrder);
};
