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
    sex: { type: Number, default: null }, // 1 là nam, 0 là nữ
    isDelete: { type: Boolean, default: false },
    role: {type: Number, required: true}//1: Amin Liên đoàn, 2: Admin hiệp đoàn, 3 Admin xứ đoàn, 4: Thành viên
},{
    timestamps: true
})

module.exports = mongoose.model('user', User)