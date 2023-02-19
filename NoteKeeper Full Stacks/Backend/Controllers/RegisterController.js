require('dotenv').config('../.env')
const express = require('express')
const User = require('../Database/User')
const bcrypt = require('bcrypt')
const createToken = require('../Config/TokenGenerator')



const { accountVerifyEmail } = require('../Controllers/SendingEmailController')

const RegisterController = async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if (!name || !email || !password || !confirmpassword) {
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

    const foundUser = await User.findOne({ email })
    if (foundUser) {
        return res.status(400).json({ status: false, message: "Email is already got registered" })
    }

    const saltRoundFromEnv = process.env.SALT_ROUNDS
    const saltRounds = Number(saltRoundFromEnv)

    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, saltRounds)
    })

    await newUser.save();

    const token = createToken({ email: newUser.email })
    const verifyLink = "http://" + req.hostname + "/verifyemail?token=" + token;

    const errorOnsentMail = await accountVerifyEmail(newUser.email, verifyLink)

    if (errorOnsentMail == false) {
        return res.status(200).json({ status: true, message: "User is registered and Verification Email is sent for account verification" })
    } else if (errorOnsentMail == true) {
        return res.status(201).json({ status: true, message: "User is registered but there is error in sending email for account verification" })
    }
}

module.exports = RegisterController