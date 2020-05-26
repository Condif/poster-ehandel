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

  user: String, //{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  orderDate: { type: String, required: true }, //Detta ska vara Date sedan

  shipment: { type: String, required: true }, //{ type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },

  totalPrice: { type: Number, required: true },

  deliveryAddress: { type: [Address], required: true },
});

module.exports = mongoose.model("orders", orderSchema);
