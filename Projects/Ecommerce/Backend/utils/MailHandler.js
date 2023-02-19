require('dotenv').config({ path: '../configurations/.env' });
const nodeMailer = require('nodemailer')
const sendPasswordResetMail = async (options) => {

    var sentStatus = true;
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: options.email,
        // to:"govindmvn@gmail.com",
        subject: options.subject,
        text: options.mailMessage
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        sentStatus = false;
    }

    return sentStatus;
}

module.exports = sendPasswordResetMail;