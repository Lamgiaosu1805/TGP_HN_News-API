const { default: axios } = require("axios");
const cheerio = require('cheerio');
const { ResponseSuccess } = require("../utils/responseRequest");
const e = require("express");
const LinhMucModel = require("../models/LinhMucModel");

const PostController = {
    getNewPost: async (req, res, next) => {
        try {
            const data = []
            const resData = await axios.get('https://www.tonggiaophanhanoi.org/');
            const html = resData.data;
            const $ = cheerio.load(html);
            $('.elementor-element-f32ff4c').each((ind, el) => {
                $(el).find('.elementor-post').each((ind, el) => {
                    const title = $(el).find('h3').text().trim();
                    const link = $(el).find('.elementor-post__thumbnail__link').attr('href');
                    const imgUrl = $(el).find('img').attr('data-src');
                    const time = $(el).find('.elementor-post__meta-data').text();
                    data.push({
                        title, link, imgUrl, time
                    })
                })
            })
            res.json(
                ResponseSuccess("Get data thành công", {
                    data: data,
                    dataNumber: data.length
                })
            )
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "Đã có lỗi trong quá trình get new post",
                error: error
            })
        }
    },

    getNewPostReceived: async (req, res, next) => {
        const data = []
        const resData = await axios.get('https://www.tonggiaophanhanoi.org/');
        const html = resData.data;
        const $ = cheerio.load(html);
        $('.elementor-element-a6c2c43').each((ind, el) => {
            $(el).find('.elementor-post').each((ind, el) => {
                const title = $(el).find('h4').text().trim();
                const link = $(el).find('.elementor-post__thumbnail__link').attr('href');
                const imgUrl = $(el).find('img').attr('data-src');
                // const time = $(el).find('.elementor-post__meta-data').text();
                data.push({
                    title, link, imgUrl
                })
            })
        })
        res.json(
            ResponseSuccess("Get data thành công", {
                data: data,
                dataNumber: data.length
            })
        )
    },

    getLoiChuaMoiNgay: async (req, res, next) => {
        const data = []
        const resData = await axios.get('https://www.tonggiaophanhanoi.org/');
        const html = resData.data;
        const $ = cheerio.load(html);
        $('.elementor-element-3d1fedf').each((ind, el) => {
            $(el).find('.elementor-post').each((ind, el) => {
                const title = $(el).find('h4').text().trim();
                const link = $(el).find('.elementor-post__thumbnail__link').attr('href');
                const imgUrl = $(el).find('img').attr('data-src');
                const metaData = $(el).find('.elementor-post__excerpt').text().trim()
                data.push({
                    title, link, imgUrl, metaData
                })
            })
        })
        res.json(
            ResponseSuccess("Get data thành công", {
                data: data,
                dataNumber: data.length
            })
        )
    },
    getLinhMuc: async (req, res, next) => {
        const data = [];
        try {
            const resData = await axios.get('https://www.tonggiaophanhanoi.org/linh-muc-doan-tong-giao-phan-ha-noi-nam-2019/');
            const html = resData.data;
            const $ = cheerio.load(html);
            $('.elementor-element-06918b4').each((ind, el) => {
                $(el).find('.wp-block-column').each(async(ind, el) => {
                    const dataItem = []
                    $(el).find('p').each((ind, el) => {  
                        if($(el).text().includes("<img")){
                            $(el).find('strong').each((ind, el) => {
                                dataItem.push($(el).text())
                            })
                        }
                        else{
                            dataItem.push($(el).text())
                        }
                    })
                    const img = $(el).find('img').attr('data-src');
                    // const linhMuc = new LinhMucModel({
                    //     type: 0,//0 LM đoàn, 1 LM Dòng, 2 LM nghỉ dưỡng, 3 LM đã mất
                    //     id: ind,
                    //     info: dataItem,
                    //     imgUrl: img,
                    // })
                    // linhMuc.save()
                    // console.log(dataItem)
                    data.push({
                        idLinhMuc: ind,
                        data: {
                            imgUrl: img,
                            detail: dataItem
                        },
                    })
                })
            })
            res.json(
                ResponseSuccess("Get data thành công", {
                    dataNumber: data.length,
                    listLinhMuc: data,
                })
            )
        } catch (error) {
            
        }
        
    }
}
module.exports = PostController;