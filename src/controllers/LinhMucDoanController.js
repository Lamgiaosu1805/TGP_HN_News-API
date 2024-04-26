const LinhMucModel = require("../models/LinhMucModel");
const { ResponseSuccess } = require("../utils/responseRequest");

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