const { ShipmentModel } = require("../models/shipmentModel");
const ServerError = require("../serverError");

// Get all shipment alternatives
exports.getShipmentAlternatives = async (req, res) => {
  const shipmentAlternatives = await ShipmentModel.find();
  if (shipmentAlternatives.length === 0) {
    throw new ServerError("The resource does not exist", 404);
  }
  res.json(shipmentAlternatives);
};

// Add shipment alternative, only for testing purposes
exports.addShipment = async (req, res) => {
  const newShipment = new ShipmentModel({
    alternative: req.body.alternative,
    cost: req.body.cost,
    deliveryTime: req.body.deliveryTime,
  });
  if (!newShipment || newShipment.length === 0) {
    throw new ServerError("Could not add shipment", 400);
  }
  const savedShipment = await newShipment.save();
  res.json(savedShipment);
};
