const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { ResponseSuccess } = require('../utils/responseRequest');
const { default: Expo } = require('expo-server-sdk');
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
    },
    pushNotification: async (req, res, next) => {
        const expo = new Expo({accessToken: process.env.EXPO_ACCESSTOKEN})
        const message = {
            to: "ExponentPushToken[zXWyPYDyEgfMnVPmS1vVHc]", // Replace with a valid push token from your app
            title: 'My Notification Title',
            body: 'This is the notification body content',
            data: { someData: 'Some data to be sent with the notification' }, // Optional data
        };
        const message2 = {
            to: "ExponentPushToken[zXWyPYDyEgfMnVPmS1vVHc]", // Replace with a valid push token from your app
            title: 'My Notification Titleeeeee',
            body: 'This is the notification body content',
            data: { someData: 'Some data to be sent with the notification' }, // Optional data
        };
        (async () => {
        try {
            const { tickets, errors } = await expo.sendPushNotificationsAsync([message, message2]);
                handlePushTicketResponses(tickets);
                handleErrorResponses(errors);
            } catch (error) {
                console.error('Error sending notifications:', error);
            }
        })();
        res.send("a")
        
        function handlePushTicketResponses(tickets) {
        // Process tickets for successful and failed deliveries
            for (const ticket of tickets) {
                const { status, error } = ticket;
                console.log(`Ticket ${ticket.id}: ${status}`);
                if (error) {
                console.error(`Error (${error.code}): ${error.message}`);
                }
            }
        }
        
        function handleErrorResponses(errors) {
            // Handle errors related to the Expo push notification service
            for (const error of errors) {
                console.error(`Expo server error: ${error}`);
            }
        }
    }
}

module.exports = LichCongGiaoController