const nodemailer = require('nodemailer')
const logger = require('../services/log')()

module.exports = function (user, subject, moreInfo) {
    const { email } = user
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Example SMTP server
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    })

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: subject,
        // text: text,
        html: moreInfo,
        // attachments: [
        //     {
        //         filename: 'image.png',
        //         path: '<https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png>',
        //     },
        // ],
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger.error(error.message)
        } else {
            logger.info('Email sent: ' + info.response)
        }
    })
}
