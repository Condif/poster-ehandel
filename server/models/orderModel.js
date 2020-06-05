const mongoose = require("mongoose");
const { productSchema } = require("./productModel.js")
const { shipmentSchema } = require("./shipmentModel.js")

const Address = require("../schemas/addressSchema");

const orderSchema = new mongoose.Schema({
  products: {  type: [[productSchema]], required: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  orderDate: { type: Date, required: true, default: Date.now }, //Detta ska vara Date sedan!!!!!!!!!!!!

  shipment: { type: shipmentSchema, required: true },

  totalPrice: { type: Number, required: true },

  deliveryAddress: { type: Address, required: true },
});

module.exports = mongoose.model("orders", orderSchema);
