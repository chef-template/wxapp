let we = require('../../we/index.js')

new class extends we.Page {
    data() {
        return {
            text: 'hello world!'
        }
    }
    onReady() {}
}