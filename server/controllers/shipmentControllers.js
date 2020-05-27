const Shipment = require("../models/shipmentModel");
const ServerError = require("../serverError");

// Get shipment by id
exports.getShipmentById = async (req, res, next) => {
  // Makes comparison in find method case insensitive
  const collation = { locale: "sv", strength: 2 };
  const shipment = await Shipment.find({
    alternative: req.params.shipmentAlternative,
  }).collation(collation);
  if (shipment.length === 0) {
    throw new ServerError("The shipment does not exist", 404);
  }
  res.json(shipment);
};

// Get all shipment alternatives
exports.getShipmentAlternatives = async (req, res) => {
  const shipmentAlternatives = await Shipment.find();
  if (shipmentAlternatives.length === 0) {
    throw new ServerError("The resource does not exist", 404);
  }
  res.json(shipmentAlternatives);
};

// Add shipment alternative, only for testing purposes
exports.addShipment = async (req, res) => {
  const newShipment = new Shipment({
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
