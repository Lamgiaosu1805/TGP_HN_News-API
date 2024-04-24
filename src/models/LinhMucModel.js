const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LinhMuc = new Schema({
    id: {type: Number, default: null},
    type: {type: Number, default: null},
    info: {type: Array, default: []},
    imgUrl: {type: String, default: ""},
    fullname: {type: String, default: ""},
    birth: {type: String, default: ""},
    leQuanThay: {type: String, default: ""},
    thuPhongLinhMuc: {type: String, default: ""},
},{
    timestamps: true
})

module.exports = mongoose.model('linhMuc', LinhMuc)