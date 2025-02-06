const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access is denied!')

    try {
        const JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY)
        req.user = decodedToken
        next()
    } catch (ex) {
        res.status(400).send('Invalid token credientials')
    }
}
