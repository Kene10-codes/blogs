const crypto = require('crypto')
const { Token } = require('../models/token')
const { User } = require('../models/users')
const {
    validatePasswordReset,
    validateNewPassword,
} = require('../validator/user/validate')
const logger = require('../services/log')()
const sendEmail = require('../services/email')

async function passwordReset(req, res) {
    try {
        const { error } = validatePasswordReset.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('Email is not in our database')

        let token = await Token.findOne({ userId: user._id })

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save()
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        sendEmail(user, 'Password Reset', '', link)
    } catch (ex) {
        logger.error(ex.message)
    }
}

async function passwordNewReset(req, res) {
    try {
        const { error } = validateNewPassword.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findById(req.params.userId)
        if (!user) return res.status(400).send('invalid link or expired')

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        })

        if (!token) return res.status(400).send('Invalid link or expired')

        user.password = req.body.password

        await user.save()
        await Token.findByIdAndDelete({ _id: token._id })

        sendEmail(
            user,
            'Password was successfully changed',
            '',
            `<p>Dear ${user.name},</p>
            <p>Welcome to our Blog! We are thrilled to have you as a new member of our community. </p>
            <p>You have successfully changed your password</p>
    
           <p> If you have any questions or need assistance, feel free to reach out to our support team at blogcustomercare101@gmail.com. We're here to help you make the most out of your experience with our Blog.
    
           Once again, welcome aboard, and thank you for joining us! </p>
           
           <p>Best regards,</p>
           <span>Kenechukwu </span>
           <p>CEO</p>`
        )
        res.status(200).send('Password reset was successful')
    } catch (ex) {
        logger.error(ex.message)
    }
}
module.exports = {
    passwordReset,
    passwordNewReset,
}
