const authRouter = require('./auth')
const postRouter = require('./post')

const api_ver = "/api/v1"
const route = (app) => {
    app.use(`${api_ver}/auth`, authRouter);
    app.use(`${api_ver}/post`, postRouter);
}

module.exports = route;