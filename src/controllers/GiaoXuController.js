const { default: axios } = require('axios');
const cheerio = require('cheerio');
const GiaoXuModel = require('../models/GiaoXuModel');
const { ResponseSuccess } = require('../utils/responseRequest');

const GiaoXuController = {
    getGiaoXu: async (req, res, next) => {
        const data = []
        try {
            const resData = await axios.get('https://www.tonggiaophanhanoi.org/giao-hat-my-duc-hoa-binh/');
            const html = resData.data;
            const $ = cheerio.load(html);
            $('.elementor-element-1a36875').each((ind, el) => {
                $(el).find('a').each(async(ind, el) => {
                    const name = $(el).text()
                    const link = $(el).attr('href')
                    const giaoXu = new GiaoXuModel({
                        tenGiaoXu: name,
                        idGiaoHat: "6642d7ab7eeac04393ce3037",
                        tenGiaoHat: "Giáo Hạt Mỹ Đức - Hoà Bình",
                        link: link
                    })
                    await giaoXu.save()
                })
            })
            res.send('end')
        } catch (error) {
            console.log(error)
        }
    },
    searchGiaoXu: async (req, res, next) => {
        const {searchValue, type, page} = req.body
        try {
            const listGiaoXu = await GiaoXuModel.find({
                tenGiaoXu: {$regex:searchValue, $options: "i"},
            }).skip((page - 1) * 15).limit(15)
            res.json(ResponseSuccess("Get data thành công", {
                page: page,
                length: listGiaoXu.length,
                data: listGiaoXu,
            }))
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = GiaoXuController