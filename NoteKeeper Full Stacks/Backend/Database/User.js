const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    userverified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Pracset", User);