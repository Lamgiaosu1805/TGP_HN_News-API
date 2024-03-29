const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validateCode = new Schema({
    userId: {type: String, ref: "user", required: true},
    validateCode: {type: Number, required: true}
})

module.exports = mongoose.model("tokenValidate", validateCode)