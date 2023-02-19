const { accountVerifyEmail } = require("./SendingEmailController");
const User = require('../Database/User')
const bcrypt = require('bcrypt')
const createToken = require('../Config/TokenGenerator')

const LoginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: false, message: "User detail field(s) are empty" })
    }

    const userFound = await User.findOne({ email })
    if (!userFound) {
        return res.status(404).json({ status: false, message: "No User found" })
    }

    const passwordMatch = bcrypt.compareSync(password, userFound.password)
    if (!passwordMatch) {
        return res.status(404).json({ status: false, message: "Invalid Email/Password" })
    }
    if (passwordMatch) {
        const token = createToken({ name: userFound.name, email: userFound.email, userverified: userFound.userverified, _id: userFound._id })
        return res.status(200).json({ status: true, token, message: "Login is successful" })
    }
}
module.exports = LoginController;