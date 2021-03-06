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
  const order = await Order.find({ user: req.session.id });

  if (!order) {
    throw new ServerError("Order does not exist", 404);
  }
  res.status(200).json(order);
};

exports.createOrder = async (req, res) => {
  const newOrder = {
    products: req.body.products,
    user: req.session.id,
    name: req.session.name,
    lastname: req.session.lastname,
    shipped: false,
    shipment: req.body.shipment,
    totalPrice: req.body.totalPrice,
    deliveryAddress: {
      address: req.body.deliveryAddress.address,
      zipcode: req.body.deliveryAddress.zipcode,
      city: req.body.deliveryAddress.city,
    },
  };

  if (!newOrder || newOrder.length === 0) {
    throw new ServerError("The order was not created", 400);
  }
  const orderDoc = new Order(newOrder);
  const savedOrder = await orderDoc.save();
  res.status(200).json(savedOrder);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    throw new ServerError("Order does not exist", 404);
  }

  if (req.params.orderId !== req.body._id) {
    throw new ServerError("You can not update order", 403);
  }
  const updatedOrder = new Order(Object.assign(order, req.body));
  await updatedOrder.save();

  res.json("Order updated");
};
