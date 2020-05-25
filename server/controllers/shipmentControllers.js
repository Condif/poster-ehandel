const Shipment = require('../models/shipmentModel');

// Get shipment by id
exports.getShipmentById = async (req, res, next) => {
    // Makes comparison in find method case insensitive
    const collation = { "locale": "sv", "strength": 2 }
    try {
        const shipment = await Shipment.find({
            'alternative': req.params.shipmentAlternative
        }).collation(collation);
        res.json(shipment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get all shipment alternatives
exports.getShipmentAlternatives = async (req, res) => {
    try {
        const shipmentAlternatives = await Shipment.find();
        res.json(shipmentAlternatives);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Add shipment alternative, only for testing purposes
exports.addShipment = async (req, res) => {
    const newShipment = new Shipment({
        alternative: req.body.alternative,
        cost: req.body.cost,
        deliveryTime: req.body.deliveryTime
    })
    try {
        const savedShipment = await newShipment.save();
        res.json(savedShipment);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};