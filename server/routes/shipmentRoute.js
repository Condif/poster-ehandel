const express = require("express");
const router = express.Router();

const controller = require("../controllers/shipmentControllers");

// Get all shipment alternatives
router.get("/", controller.getShipmentAlternatives);

// Get specific shipment alternative
// router.get('/:shipmentAlternative', controller.getShipmentById);

// Add shipment alternative, for testing purposes
// router.post('/', controller.addShipment)

module.exports = router;
