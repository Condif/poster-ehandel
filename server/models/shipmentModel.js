const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  alternative: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
});

module.exports = {
  shipmentSchema: shipmentSchema,
  ShipmentModel: mongoose.model("Shipment", shipmentSchema),
};
