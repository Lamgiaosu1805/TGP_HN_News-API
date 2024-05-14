const authRouter = require('./auth')
const postRouter = require('./post')
const lichRouter = require('./lichCongGiao')
const linhMucRouter = require('./linhMucDoan')
const giaoHatRouter = require('./giaoHat')
const giaoXuRouter = require('./giaoXu')

const api_ver = "/api/v1"
const route = (app) => {
    app.use(`${api_ver}/auth`, authRouter);
    app.use(`${api_ver}/post`, postRouter);
    app.use(`${api_ver}/lichCongGiao`, lichRouter);
    app.use(`${api_ver}/linhMucDoan`, linhMucRouter);
    app.use(`${api_ver}/giaoHat`, giaoHatRouter);
    app.use(`${api_ver}/giaoXu`, giaoXuRouter);
    app.use(`/`, (req, res, next) => {
        res.send("Hello world")
    });
}

module.exports = route;