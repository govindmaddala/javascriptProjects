const jwt = require('jsonwebtoken')
const User = require('../models/User.js');

const verifyEmailController = async (req, res) => {
    const { token } = req.query
    if (!token) {
        res.status(403).json({ success: false, message: "Invalid token..!" })
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JSON_SECRET);
    } catch (err) {
        return res.status(404).json({ success: false, mesaage: "Invalid token", error: err });
    }

    //Checking if user is present or not
    const existingUser = await User.findOne({ email: decodedToken.email })

    if (!existingUser) {
        return res.status(404).json({ success: false, mesaage: "User not found" });
    }

    existingUser.verified = true;
    await existingUser.save();

    res.status(200).json({ success: true, message: "Email is verified" })
}

module.exports = verifyEmailController;