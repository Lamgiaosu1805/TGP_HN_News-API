const LinhMucModel = require("../models/LinhMucModel");
const { ResponseSuccess, ResponseFailure } = require("../utils/responseRequest");

const LinhMucDoanController = {
    getLinhMuc: async (req, res, next) => {
        try {
            const listLinhMuc = await LinhMucModel.find().sort({'id': 1});
            res.json(ResponseSuccess("Get danh sách linh mục thành công", {
                total: listLinhMuc.length,
                data: listLinhMuc,
            }))
        } catch (error) {
            console.log(error)
        }
    },
    getLinhMucPerPage: async (req, res, next) => {
        try {
            const page = parseInt(req.params.page);
            const listLMPerPage = await LinhMucModel.find().skip((page-1)*15).limit(15)
            if(listLMPerPage) {
                res.json(ResponseSuccess("Get data thành công", {
                    page: page,
                    length: listLMPerPage.length,
                    data: listLMPerPage,
                }))
            }
            else {
                console.log("LỖIIII")
            }
        } catch (error) {
            console.log(error)
        }
    },

    searchLinhMuc: async (req, res, next) => {
        const {searchValue, type, page} = req.body
        try {
            const listLinhMuc = await LinhMucModel.find({
                info: {$regex:searchValue, $options: "i"}
            }).skip((page - 1) * 15).limit(15)
            res.json(ResponseSuccess("Get data thành công", {
                page: page,
                length: listLinhMuc.length,
                data: listLinhMuc,
            }))
        } catch (error) {
            console.log(error);
        }
    },

    updateLinhMucInfo: async (req, res, next) => {
        try {
            const listLinhMuc = await LinhMucModel.find();
            listLinhMuc.forEach(async(linhMuc, index) => {
                await LinhMucModel.updateMany({_id: linhMuc._id}, {
                    id: index,
                    fullname: linhMuc.info[0].trim(),
                    birth: linhMuc.info[2],
                    leQuanThay: linhMuc.info[3],
                    thuPhongLinhMuc: linhMuc.info[4],
                    // info: [linhMuc.info[1], linhMuc.info[5]]
                })
            })
            res.json({
                message: "done"
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = LinhMucDoanController