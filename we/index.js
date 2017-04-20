let Pages = require('./pages.js')
let utils = require('./utils.js')
let request = require('./request.js')
let navigateTo = require('./navigateTo.js')
let redirectTo = require('./redirectTo.js')
let Application = require('./application.js')

let config = {
    http: {
        root: '',
        header: {},
        duration: 1000,
        timestamp: false,
        error: (message) => we.showModal({ content: '', title: message })
    },
    router: {
        maps: {}
    }
}

function we(obj = {}) {
    we.request = request(Object.assign({}, config.http, obj.http))
    we.navigateTo = navigateTo(Object.assign({}, config.router, obj.router))
    we.redirectTo = redirectTo(Object.assign({}, config.router, obj.router))
}

utils.toPromise(we, wx)
we.request = request(config.http)
we.navigateTo = navigateTo(config.router)
we.redirectTo = redirectTo(config.router)

we.Page = Pages
we.App = Application

Pages.global = we
Application.global = we

module.exports = we