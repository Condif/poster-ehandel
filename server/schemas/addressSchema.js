const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema ({ 
    address: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}
, {_id: false})

module.exports = addressSchema