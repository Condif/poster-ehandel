const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, 'username has to be at least 3 characters'],
        max: 20,

        required: true,
        unique: true
    },
    password: {
        type: String,
        min: [5, 'password has to be at least 5 characters'],
        max: 20,

        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    }
})


module.exports = mongoose.model('User', userSchema)