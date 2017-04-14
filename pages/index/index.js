let we = require('../../we/index.js')
let urls = require('../../we/map.js')

new class extends we.Page {
    data() {
        return {
            text: 'hello world!'
        }
    }
    // 进入图书角
    gotoLibrary(){
        console.log('进入图书角')
        this.$navigateTo({
            url: urls.books
        })
    }
    // 进入会议室预约
    gotoMeetingRoom(){
        console.log('预约会议室')
        this.$redirectTo({
            url: urls.bookingMeetingRoom
        })
    }
    onReady() {
        console.log(urls)
    }
}