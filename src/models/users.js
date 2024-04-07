const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        lowerCase: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    isAdmin: Boolean,
})

// CREATE A SIGN TOKEN
userSchema.methods.generateToken = function () {
    const JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY
    return jwt.sign({ _id: this._id }, JWT_SECRET_KEY)
}

// EXPORT USER MODULE
const User = mongoose.model('User', userSchema)

module.exports = User
