const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GiaoXu = new Schema({
    tenGiaoXu: {type: String, default: ""},
    idGiaoHat: {type: String, default: ""},
    tenGiaoHat: {type: String, default: ""},
    link: {type: String, default: ""},
    address: {type: String, default: ""},
    imageUrl: {type: String, default: ""}
},{
    timestamps: true
})

module.exports = mongoose.model('giaoXu', GiaoXu)