const nodemailer = require('nodemailer')
const logger = require('../services/log')()

module.exports = function (email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Thanks for Registering',
        text: 'your email body content here',
        html: `
         <h1>Sample Heading Here</h1>
         <p>message here</p>
        `,
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
