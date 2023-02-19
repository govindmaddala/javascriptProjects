require('dotenv').config('../../Backend/.env')
const jwt = require('jsonwebtoken');
const User = require('../models/User')


verifyTokenController = async (req, res) => {
    const { token } = req.query

    if (!token) {
        return res.status(404).json({ success: false, message: "Invalid token" });
    }

    //decode the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JSON_SECRET);
    } catch (err) {
        return res.status(404).json({ success: false, message: "Invalid token", error: err });
    }
    //Checking if user is present or not
    const existingUser = await User.findOne({ email: decodedToken.email })

    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: decodedToken.email })
}

module.exports = { verifyTokenController };