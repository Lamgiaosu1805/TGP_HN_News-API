const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { ResponseSuccess } = require('../utils/responseRequest');
const LichCongGiaoController = {
    getLich: async (req, res, next) => {
        const data = [];
        try {
            const resData = await axios.get('https://www.tonggiaophanhanoi.org/lich-phung-vu-cong-giao-2023-2024/');
            const html = resData.data;
            const $ = cheerio.load(html);
            $('.elementor-widget-container').each((ind, el) => {
                $(el).find('ul').each((ind, el) => {
                    $(el).find('li').each((ind, el) => {
                        const link = $(el).find('a').attr('href').trim()
                        const title = $(el).text().trim()
                        data.push({
                            title: title,
                            link: link
                        })
                    });
                })
            });
            res.json(
                ResponseSuccess("Get data thành công", {
                    data: data,
                })
            )
            
        } catch (error) {
            
        }
    }
}

module.exports = LichCongGiaoController