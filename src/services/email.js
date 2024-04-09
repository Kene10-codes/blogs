const nodemailer = require('nodemailer')
const logger = require('../services/log')()

module.exports = function (user) {
    const { email, name } = user
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
        subject: 'Welcome to our Blog - Your Account has been Created!',
        // text: 'your email body content here',
        html: `
         <p>Dear ${name},</p>
         <p>Welcome to our Blog! We are thrilled to have you as a new member of our community. </p>
         <p>Your account has been successfully created, and you are now ready to explore all the features and 
         benefits our platform has to offer.</p>

        <p> If you have any questions or need assistance, feel free to reach out to our support team at [Support Email Address]. We're here to help you make the most out of your experience with [Web App Name].

        Once again, welcome aboard, and thank you for joining us! </p>
        
        <p>Best regards,</p>
        <p>Kenechukwu </p>
        <p>CEO</p>
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
