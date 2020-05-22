const mongoose = require('mongoose');
const Address = require("../schemas/addressSchema");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [2, 'firstname has to be at least 2 characters'],
        max: 20,
        required: true,
    },
    lastname: {
        type: String,
        min: [2, 'lastname has to be at least 2 characters'],
        max: 20,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: [5, 'password has to be at least 5 characters'],
        max: 20,
        required: true,
    },
    role: {
        type: Boolean,
        required: true,
    },
    deliveryAddress: [Address]
})


module.exports = mongoose.model('User', userSchema)