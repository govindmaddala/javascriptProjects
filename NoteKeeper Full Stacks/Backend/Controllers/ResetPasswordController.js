require('dotenv').config('../.env')
const User = require('../Database/User')
const bcrypt = require('bcrypt')

const ResetPasswordController = async (req, res) => {

    const { email, password, confirmpassword } = req.body
    if (!email || !password || !confirmpassword) {
        return res.status(400).json({ status: false, message: "User detail field(s) are empty" })
    }

    if (!/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({ status: false, message: "Invalid Email" })
    }

    if (password !== confirmpassword) {
        return res.status(400).json({ status: false, message: "Password should be same" })
    }

    if (!password.match(/[a-z]/g) || !password.match(/[A-Z]/g) || !password.match(/[0-9]/g) || !password.match(/[^a-zA-Z\d]/g) || !password.length >= 8) {
        return res.status(400).json({ status: false, message: "Password should have atleast one capital letter, special character and be of length 8" })
    }

    const userFound = await User.findOne({ email })
    if (!userFound) {
        return res.status(404).json({ status: false, message: "User not found" })
    } else {

        const saltRoundFromEnv = process.env.SALT_ROUNDS
        const saltRounds = Number(saltRoundFromEnv)
        const newPassword = bcrypt.hashSync(password, saltRounds)
        userFound.password = newPassword
        userFound.save();
        return res.status(200).json({ status: true, message: "Password is changed" })
    }
}

module.exports = ResetPasswordController;