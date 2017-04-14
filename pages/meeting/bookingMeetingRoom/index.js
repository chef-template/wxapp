let we = require('../../../we/index.js')
let urls = require('../../../we/map.js')


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
                name: '九层大会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              },
              {
                name: '九层小会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              },
              {
                name: '九层开放会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              }]
            },
            {
              name: '十一层会议室',
              status: false,
              list: [{
                name: '十一层大会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              },
              {
                name: '十一层小会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              },
              {
                name: '十一层开放会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              }]
            },
            {
              name: '十层会议室',
              status: false,
              list: [{
                name: '十层大会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              },
              {
                name: '十层小会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
              },
              {
                name: '十层开放会议室',
                size: '8-10',
                currentAppointment: '',
                time: '2017年04月12日 上午 10时-12时',
                status: false
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
    gotoMeetingInfo() {
      console.log(urls)
      this.$redirectTo({
        
          url: urls.meetingInfo
      })
    }
    onReady() {
      this.setData({
        meetingList : this.data.officeList[0].list
      })
    }
}

