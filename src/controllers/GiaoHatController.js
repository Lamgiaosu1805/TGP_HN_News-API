const GiaoHatModel = require("../models/GiaoHatModel")

const GiaoHatController = {
    saveGiaoHat: async (req, res, next) => {
        try {
            const giaoHat = new GiaoHatModel({
                tenGiaoHat: "Giáo Hạt Mỹ Đức - Hoà Bình",
                idLinhMucQuanHat: "662b63dea45bdbbe88ab945f",
                tenLinhMucQuanHat: "Giu-se Vũ Đình Du",
                link: "https://www.tonggiaophanhanoi.org/giao-hat-my-duc-hoa-binh/",
                imageUrl: "https://www.tonggiaophanhanoi.org/wp-content/uploads/2020/12/My-Duc-Hoa-Binh.jpg"
            })
            await giaoHat.save()
            res.send("success")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = GiaoHatController