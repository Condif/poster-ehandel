const mongoose = require("mongoose");

const Address = require("../schemas/addressSchema");

const orderSchema = new mongoose.Schema({
  products: String,
  // [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Products",
  //   },
  // ],

  user: String, //{ type: mongoose.Schema.Types.ObjectId, ref: "User" },

  orderDate: String, //Detta ska vara Date sedan

  shipment: String, //{ type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },

  totalPrice: Number,

  deliveryAddress: [Address],
});

module.exports = mongoose.model("orders", orderSchema);
