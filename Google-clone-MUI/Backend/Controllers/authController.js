require('dotenv').config('../../Backend/.env')
const bcrypt = require('bcrypt')
const User = require('../models/User');
const _ = require("lodash")

//token generator
const tokenGenerator = require('../config/createToken');
const { accountVerificationEmail, forgotPasswordEmail } = require('../config/sendEmail');

const secretRounds = process.env.SALT_ROUNDS
const saltRounds = Number(secretRounds)

const registerController = async (req, res) => {
    const { name, email, password } = req.body

    //validate credentials are not null
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    //validate valid email format
    if (!/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({ success: false, message: "Please enter valid email" });
    }
    //validate password is greater than length 0f 7
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password should be atleast of length 8!" });
    }

    //Handle if a user is trying to register with exising email
    const username = await User.findOne({ email: email })
    if (username) {
        return res.status(403).json({ success: false, message: "This email is already registered" });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const hashPassword = hash
            const newUser = new User({
                name,
                email,
                password: hashPassword
            })
            await newUser.save()

            //token is generated
            const token = tokenGenerator({ email: newUser.email });

            //send mail
            const verifyLink = "http://" + req.hostname + ":3000/verifyEmail?token=" + token;
            const sentMail = await accountVerificationEmail(newUser.email, verifyLink)  //it returns false if mail is sent successfully

            if (!sentMail) { //for sentMail = false becomes true and this gets executed
                return res.status(201).json({ success: true, message: "Registration is successfull and Verification mail is sent" })
            } else { //for sentMail = true
                return res.status(400).json({ success: true, message: "Registration is successfull but Error in sending verification mail" })
            }
        })
    })
};

const loginController = async (req, res) => {
    const { email, password } = req.body

    //validate credentials are not null
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Invalid Email/Password" });
    }

    //Finding existing user with email entered
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
        return res.status(403).json({ success: false, message: "Invalid Email/Password" });
    }
    const passwordsMatched = await bcrypt.compare(password, existingUser.password)
    if (!passwordsMatched) {
        return res.status(400).json({ success: false, message: "Invalid Email/Password" });
    } else {
        const token = tokenGenerator({ email: existingUser.email, user: existingUser.name, verified: existingUser.verified, _id: existingUser._id });
        const user = _.capitalize(existingUser.name)
        return res.status(200).json({ success: true, token, message: `${user}, Your Login is successful` })
    }
}


const forgotpasswordController = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ success: false, message: "Please enter Email field" });
    }

    if (!/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({ success: false, message: "Please enter valid email" });
    }

    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    } else {
        const token = tokenGenerator({ email });
        //send mail
        const forgotPasswordLink = "http://" + req.hostname + ":3000/resetpassword?token=" + token;
        const sentMail = await forgotPasswordEmail(email, forgotPasswordLink)  //it returns false if mail is sent successfully

        if (!sentMail) { //for sentMail = false becomes true and this gets executed
            return res.status(201).json({ success: true, message: "Mail for reset password is sent" })
        } else { //for sentMail = true    
            return res.status(400).json({ success: false, message: "Error in sending mail, please try again!" })
        }
    }
}

const resetPasswordController = async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body
    if (!email || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    //validate valid email format
    if (!/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return res.status(400).json({ success: false, message: "Please enter valid email" });
    }
    //validate password is greater than length 0f 7
    if (newPassword.length < 8) {
        return res.status(400).json({ success: false, message: "Password should be atleast of length 8!" });
    }

    if (newPassword != confirmNewPassword) {
        return res.status(400).json({ success: false, message: "Passwords don't match" });
    }

    const existingUser = User.findOne({ email });

    if (!existingUser) {
        return res.status(404).json({ success: false, message: "User not found..!" });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newPassword, salt, async (err, hash) => {
            const hashPassword = hash
            const updatedUserData = await User.findOneAndUpdate({ email }, { $set: { password: hashPassword } })
            if (updatedUserData) {
                return res.status(200).json({ success: true, message: "Password updated successfully" });
            } else {
                return res.status(500).json({ success: false, message: "Something went wrong" });
            }
        })

    })
}

module.exports = { registerController, loginController, forgotpasswordController, resetPasswordController };