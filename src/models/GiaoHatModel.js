const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GiaoHat = new Schema({
    tenGiaoHat: {type: String, default: ""},
    idLinhMucQuanHat: {type: String, default: ""},
    tenLinhMucQuanHat: {type: String, default: ""},
    link: {type: String, default: ""},
    imageUrl: {type: String, default: ""}
},{
    timestamps: true
})

module.exports = mongoose.model('giaoHat', GiaoHat)