const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    alternative: {
        type: String,
        unique: true,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    }
});

module.exports = {
    shipmentSchema: shipmentSchema,
    Model: mongoose.model('Shipment', shipmentSchema)
};