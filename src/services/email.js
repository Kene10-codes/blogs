const nodemailer = require('nodemailer')
const logger = require('../services/log')()

module.exports = function (user, subject, text, moreInfo) {
    const { email } = user
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
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
