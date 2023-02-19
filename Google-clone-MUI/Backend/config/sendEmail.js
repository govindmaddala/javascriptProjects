require('dotenv').config('../../Backend/.env')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const accountVerificationEmail = async (toAddress, verifyLink) => {
    let error = false;
    try {
        let info = await transporter.sendMail({
            from: '"NoteKeeper"', // sender address
            to: toAddress, // list of receivers
            subject: `Verification mail for ${toAddress} from Notes Keeper`, // Subject line
            html: `Please verify your email by clicking on <a href='${verifyLink}'>link</a> <br/> This link will be valid for 7 days only !`, // html body
        });
    } catch (e) {
        error = true
    }
    return error
}

const forgotPasswordEmail = async (toAddress, forgotPasswordLink) => {
    let error = false;
    try {
        let info = await transporter.sendMail({
            from: '"NoteKeeper"', // sender address
            to: toAddress, // list of receivers
            subject: `Forgot Credentials mail for ${toAddress} from Notes Keeper`, // Subject line
            html: `Please reset your password by clicking on <a href='${forgotPasswordLink}'>link</a> <br/> This link will be valid for 7 days only !`, // html body
        });
    } catch (e) {
        error = true
    }
    return error
}

module.exports = { accountVerificationEmail, forgotPasswordEmail }
