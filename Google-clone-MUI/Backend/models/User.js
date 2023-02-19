const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
    emailVerificationToken: {
        type: String,
        default: ""
    },
    verified: {
        type: Boolean,
        default: false
    },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model("usersdata", UserSchema);