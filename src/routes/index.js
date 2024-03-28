const testRouter = require('./test')

const api_ver = "/api/v1"
const route = (app) => {
    app.use(`${api_ver}/test`, testRouter)
    app.use(`${api_ver}/auth`, testRouter)
}

module.exports = route;