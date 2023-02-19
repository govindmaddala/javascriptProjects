require('dotenv').config('../.env')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

const accountVerifyEmail = async (toAddress, verificationLink) => {
    let error = false
    try {
        await transporter.sendMail({
            from: "Notekeeper",
            to: toAddress,
            subject: "Account verification mail from Notekeeper",
            html: `Click on <a href=${verificationLink}>link</a>  to verify your account. This link will be valid for 7 days.`
        })
    } catch {
        error = true
    }
    return error
}

const forgetPasswordEmail = async (toAddress, forgetmailLink) => {
    let error = false
    try {
        await transporter.sendMail({
            from: "Notekeeper",
            to: toAddress,
            subject: "Account verification mail from Notekeeper",
            html: `Click on <a href=${forgetmailLink}>link</a> to verify your account. This link will be valid for 7 days.`
        })
    } catch {
        error = true
    }
    return error
}

module.exports = { accountVerifyEmail, forgetPasswordEmail };