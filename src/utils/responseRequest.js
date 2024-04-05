const ResponseSuccess = (message, data) => {
    return {
        status: true, message, data
    }
}

const ResponseFailure = (code, message, error) => {
    return {
        status: false, code, message, error
    }
}

module.exports = {ResponseSuccess, ResponseFailure}