let utils = require('./utils.js')

class Pages {
    constructor() {
        this.$app = Pages.global.app
        utils.mixWxApi(this, Pages.global)

        Page(Object.assign({
            onLoad: onLoad.call(this),
            data: this.data ? this.data() : {}
        }, utils.getClassMethods(this, ['data', 'onLoad'])))
    }
    setData(obj) {
        this.$page.setData(obj)
    }
}

function onLoad() {
    let context = this

    return function (options) {
        context.$page = this
        context.data = this.data

        if (context.onLoad) {
            context.onLoad(options)
        }
    }
}

Pages.global = {}
module.exports = Pages