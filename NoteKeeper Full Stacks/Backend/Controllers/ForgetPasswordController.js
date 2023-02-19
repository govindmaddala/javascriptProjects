const createToken = require('../Config/TokenGenerator')
const User = require('../Database/User')
const { forgetPasswordEmail } = require('./SendingEmailController')

const forgetPasswordController = async (req, res) => {
    const { email } = req.body
    if (!email || !/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        res.status(400).json({ status: false, message: "Please enter valid email" })
    }

    const userFound = await User.findOne({ email })

    if (!userFound) {
        res.status(404).json({ status: false, message: "User not found" })
    }

    const token = createToken({ email })
    const forgotPasswordLink = "http://" + req.hostname + ":5000/resetpassword?token=" + token
    const errorOnSendingMail = await forgetPasswordEmail(email, forgotPasswordLink)
    if (errorOnSendingMail) {
        res.status(400).json({ status: false, message: "Error in sending email, please try again" })
    } else {
        res.status(200).json({ status: true, message: "E-mail for resetting password is sent..Please check you mail" })
    }
}

module.exports = forgetPasswordController;