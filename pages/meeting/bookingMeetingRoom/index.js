let we = require('../../../we/index.js')
let urls = require('../../map.js')


new class extends we.Page {
    data() {
        return {
          banner: {
            mode: 'scaleToFill'
          },
          oldIndex: 0,
          meetingList: null,
          officeList: [

            {
              name: '九层会议室',
              status: true,
              list: [{
                name: '9大会议室',
                size: '8-10'
              },
              {
                name: '9小会议室',
                size: '8-10'
              },
              {
                name: '9开放会议室',
                size: '8-10'
              }]
            },
            {
              name: '十层会议室',
              status: false,
              list: [{
                name: '10大会议室',
                size: '8-10'
              },
              {
                name: '10小会议室',
                size: '8-10'
              },
              {
                name: '10开放会议室',
                size: '8-10'
              }]
            },
            {
              name: '十一层会议室',
              status: false,
              list: [{
                name: '11大会议室',
                size: '8-10'
              },
              {
                name: '11小会议室',
                size: '8-10'
              },
              {
                name: '11开放会议室',
                size: '8-10'
              }]
            }
          ]
        }
    }
    // 进入图书角
    switchTab(e){
      let name = e.currentTarget.dataset.name,
          data = this.data.officeList.slice()

      data.map((item,index)=>{
        if(name == item.name){
          // 重复点击return
          if(index == this.data.oldIndex){
            return
          }
          // 修改当前按钮状态 和 历史状态
          data[index].status = true
          data[this.data.oldIndex].status = false
          // 当前楼层会议室列表赋值
          this.setData({
            meetingList: data[index].list
          })
          // 修改会议室总数据
          this.setData({
            officeList: data
          })
          // 重置按钮索引
          this.setData({
            oldIndex: index
          })
        }
      })
    }
    // 进入会议室详情
    gotoMeetingInfo(e) {
      console.log(urls)
      let name = e.currentTarget.dataset.name,
          url = urls.meetingInfo + '?name=' + name
      this.$redirectTo({
          url: url

      })
    }
    onReady() {
      this.setData({
        meetingList : this.data.officeList[0].list
      })

      wx.request({
        method:'get',
        url: 'http://192.168.18.77:8080/v1/meeting',
        success: function(res) {
          console.log(res.data)
        }
      })
    }
}

