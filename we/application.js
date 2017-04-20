let utils = require('./utils.js')

class Application {
    constructor() {
        utils.mixWxApi(this, Application.global)
        Application.global.app = this.$app = this
        Object.assign(this, this.data ? this.data() : {})

        App(utils.getClassMethods(this, ['data']))
    }
}

Application.global = {}
module.exports = Application