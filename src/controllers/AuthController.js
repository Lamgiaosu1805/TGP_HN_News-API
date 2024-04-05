const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const ValidateCodeEmailModel = require("../models/ValidateCodeEmailModel");
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const { ResponseSuccess } = require("../utils/responseRequest");

//Sinh OTP
const generateOTP = () => {
    const randomInt = Math.floor(Math.random() * 1000000);
    return randomInt.toString().padStart(6, '0');
}

//Gửi OTP qua mail
const sendValidateMail = async (mail, OTP) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        await transporter.sendMail({
            from: "TNTT_VN",
            to: mail,
            subject: "Xác minh tài khoản",
            text: "xác minh tài khoản",
            html: `
            <div>
                <p>OTP xác minh tài khoản của bạn là ${OTP}</p>
            </div>
            `
        })
        return {status: true, message: "send mail success"}
    } catch (error) {
        console.log("error", error)
        return {status: false, message: "send mail failure"}
    }
}

const genAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        mail: user.mail,
        role: user.role,
    },
        process.env.SECRET_KEY,
        {
            expiresIn: "365d"
        }
    )
}
  
const AuthController = {
    signUp: async (req, res, next) => {
        try {
            const {body} = req
            const user = await UserModel.findOne({mail: body.mail})
            const salt = bcrypt.genSalt(10);
            if(user && user.isValidated) {
                res.json({
                    status: false,
                    message: "mail đã được sử dụng"
                })
            }
            else if(user && !user.isValidated) {
                await user.updateOne({
                    password: bcrypt.hash(body.password, salt),
                    saintName: body.saintName,
                    fullName: body.fullName,
                    giaoPhan: body.giaoPhan,
                    giaoHat: body.giaoHat,
                    giaoXu: body.giaoXu,
                    sex: body.sex,
                });
                const verifyCode = generateOTP();
                const validateCode = await ValidateCodeEmailModel.findOne({userId: user._id});
                if(validateCode) {
                    await ValidateCodeEmailModel.updateOne({userId: user._id}, {validateCode: verifyCode})
                }
                else {
                    const validateCodeNew = new ValidateCodeEmailModel({
                        userId: user._id,
                        validateCode: verifyCode
                    })
                    await validateCodeNew.save();
                }
                res.json(ResponseSuccess(
                    "Đã thay thế tài khoản có email chưa validate",
                    {
                        userId: user._id,
                        mail: user.mail
                    }
                ))
                
                await sendValidateMail(user.mail, verifyCode);
            }
            else {
                const user = new UserModel({
                    mail: body.mail,
                    password: await bcrypt.hash(body.password, 10),
                    saintName: body.saintName,
                    fullName: body.fullName,
                    giaoPhan: body.giaoPhan,
                    giaoHat: body.giaoHat,
                    giaoXu: body.giaoXu,
                    sex: body.sex,
                    role: 4,
                })
                await user.save();
                const verifyCode = generateOTP();
                const validateCodeNew = new ValidateCodeEmailModel({
                    userId: user._id,
                    validateCode: verifyCode
                })
                await validateCodeNew.save();
                res.json(ResponseSuccess(
                    "Tạo tài khoản thành công",
                    {
                        userId: user._id,
                        mail: user.mail
                    }
                ))
                await sendValidateMail(user.mail, verifyCode);
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: false,
                message: "Đã có lỗi trong quá trình đăng ký tài khoản",
                error: error
            })
        }
    },

    signIn: async(req, res, next) => {
        const {body} = req;
        try {
            const user = await UserModel.findOne({mail: body.mail})
            if(!user) {
                res.json({
                    status: false,
                    message: "mail không tồn tại"
                })
            }
            else if (user && user.isValidated === false) {
                res.json({
                    status: false,
                    message: "mail chưa được xác minh"
                })
            }
            else {
                const validPassWord = await bcrypt.compare(
                    body.password,
                    user.password
                );
                if(!validPassWord) {
                    res.json({
                        status: false,
                        message: "Wrong Password"
                    })
                }
                if(validPassWord) {
                    const accessToken = genAccessToken(user);
                    const {password, ...others} = user._doc;
                    res.json(ResponseSuccess("Đăng nhập thành công", {...others, accessToken}))
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: false,
                message: "Đã có lỗi trong quá trình đăng nhập",
                error: error
            })
        }
    },

    validateOTP: async (req, res, next) => {
        try {
            const {body} = req
            const validateCode = await ValidateCodeEmailModel.findOne({userId: body.userId});
            if(validateCode) {
                if(validateCode.validateCode == body.validateCode) {
                    await UserModel.updateOne({_id: body.userId}, {isValidated: true})
                    res.json(
                        ResponseSuccess("Xác thực mail thành công")
                    )
                }else{
                    res.json({
                        status: false,
                        message: "OTP không chính xác"
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    message: "User không tồn tại"
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: false,
                message: "Đã có lỗi trong quá trình Xác minh email",
                error: error
            })
        }
    },
    resendOTP: (req, res, next) => {

    }
    
}

module.exports = AuthController;