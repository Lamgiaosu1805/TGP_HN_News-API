const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    saintName: { type: String, default: "" },
    fullName: { type: String, required: true },
    giaoPhan: { type: String, default: "" },
    giaoHat: { type: String, default: "" },
    giaoXu: { type: String, default: "" },
    isValidated: { type: Boolean, default: false },
    sex: { type: Number, default: null },
    isDelete: { type: Boolean, default: false },
    role: {type: Number, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('user', User)