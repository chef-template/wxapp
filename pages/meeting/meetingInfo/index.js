let we = require('../../../we/index.js')
let urls = require('../../util/map.js')
let utils = require('../../util/index.js')


new class extends we.Page {
    data() {
        return {
          date: "2017-04-17",
          startTime: 10,
          endTime: 20,
          timeList: []
        }
    }

    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        })
    }

    selectTime(e){
        let index = e.currentTarget.dataset.index
        console.log(index)
        let timeDataList = this.data.timeList.slice()
        let oldIndex = ''
        if(index === oldIndex){
            return;
        }
        console.log(timeDataList)
        if(oldIndex != ''){
            timeDataList[oldIndex].status = !timeDataList[oldIndex].status
        }
        oldIndex = index
        console.log( timeDataList[index])
        timeDataList[index].status = !timeDataList[index].status

        this.setData({
            timeList : timeDataList
        })
    }

    onReady() {

        let newTimeList = utils.timeFormatList(this.data.startTime,this.data.endTime,30).map((item)=>{
            return {
                time: item,
                status: false
            }
        })
        this.setData({
            timeList:newTimeList
        })
    }
}
