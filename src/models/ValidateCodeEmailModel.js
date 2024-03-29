const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ValidateCode = new Schema({
    userId: {type: String, ref: "user", required: true},
    validateCode: {type: Number, required: true}
})

module.exports = mongoose.model("validateCode", ValidateCode)