const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../models/orderModel");
const controller = require("../controllers/orderControllers");

//GET all orders
router.get("/", controller.getAllOrders);

//GET order by user id
router.get("/:_id", controller.getOrderByUserId);

//POST order
router.post("/", controller.createOrder);

// Update if a order is shipped
router.put("/:orderId", controller.updateOrder);

module.exports = router;
