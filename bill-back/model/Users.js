const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fonction: {type: String},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    enterprise: {type: String, required: true},
    mainAdress: {type: String},
    scdAddress: {type: String},
    zipcode: {type: String, required: true},
    country: {type: String},
    city: {type: String, required: true},
    regDate: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema)