const mongoose = require('mongoose')
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

// EXPORT USER MODULE
const User = mongoose.model('User', userSchema)

module.exports = User
