let we = require('../../we/index.js')
let mix = require('../utils/mix')
let { dateFormat, timeSep } = require('../utils/date')

let local = dateFormat(null, true)
let toast = require('../../weui/toast/index')
let backup = timeSep(8, 20, 30)

let Page = class extends we.Page {
	data() {
		return {
			tabs: {
				tab: [
					{
						name: '9楼会议室',
						meetingType: 0
					},
					{
						name: '11楼会议室',
						meetingType: 1
					}
				],
				key: 'meetingType',
				active: 0
			},
			toast: {
				isShow: false,
				title: '',
				content: []
			},

			limit: 5,
			now: local,
			isPrev: false,
			isNext: true,
			bookList: backup,
			cache: {
				meetingType: 0,
				userId: ''
			}
		}
	}

	onTapTab(e) {
		let index = e.target.dataset.index
		this.setData({
			'tabs.active': index
		})
		// 切换会议室显示
	}

	selectMeeting(index) {
		this.setData({
			'tabs.active': index,
			'cache.currentMeeting': this.data.tabs.tab[index].meetingType
		})
	}
	// 选择某一天的逻辑入口
	selectDay(formatter) {
		let { year, month, date } = formatter
		date = date * 1
		date = Math.min(date, local.date + this.data.limit)
		date = Math.max(date, local.date)
		// 设置当前显示
		this.setData({
			now: dateFormat(new Date(year, month - 1, date), true)
		})
		// 设置上下btn
		this.setDateBtnState()
		// 获取当天的已订阅记录
	}
	getDayBookTimes(y, m, d) {
		let opts = {
			start: +new Date(y, m - 1, d, 8),
			end: +new Date(y, m - 1, d, 20, 30),
			userId: '',
			meetingType: this.data.cache.meetingType
		}
	}

	setCache() {

	}

	onTapTime(e) {

	}

	setDateBtnState() {
		let { year, month, date, s } = this.data.now
		let dateLimit = +new Date(year, month - 1, local.date + this.data.limit)

		this.setData({
			isPrev: s > local.s,
			isNext: s < dateLimit
		})
	}

	onPrevDay() {
		let { year, month, date } = this.data.now
		date *= 1
		this.selectDay(dateFormat(new Date(year, month - 1, date - 1)))
	}

	onNextDay() {
		let { year, month, date } = this.data.now
		date *= 1
		this.selectDay(dateFormat(new Date(year, month - 1, date + 1)))
	}

	onReady() {

	}
	// 后端的数据转成view层数据
	_toInput(output) {
		var cache, item, start, end, result, startTime, endTime, cacheName, now
		
		now = this.data.now
		cache = {}
		result = clone(backup)

		for (item of output) {
			startTime = dateFormat(new Date(item.start), true)
			cacheName = `${startTime.year}:${startTime.month}:${startTime.date}`
			
			endTime = dateFormat(new Date(item.end), true)
			
			start = `${startTime.hour}:${startTime.minute}`
			end = `${endTime.hour}:${endTime.minute}`
			
			if (!cache[cacheName]) {
				cache[cacheName] = {}
			}
			
			cache[cacheName][`${start}-${end}`] =  item.userId
		}
		
		cache = cache[`${now.year}:${now.month}:${now.date}`]
		this.setData({
			bookList: result.map(item => {
				item.state = cache[item.time] == this.userId ? 'checked' : item.state		 
				return item
			})
		})
		
		cache = null
	}
	// view层数据转成后台格式的数据
	_toOutput(input) {
		let { year, month, date } = this.data.now
		let hour, minute
		return input.filter(item => item.state == 'checked').map(item => {
			[start, end] = item.time.split('-')
			[hour, minute] = start.split(':')
			item.start = dateFormat(new Date(year, month - 1, date, hour, minute)).s
			[hour, minute] = end.split(':')
			item.end = dateFormat(new Date(year, month - 1, date, hour, minute)).s
			delete item.time
			item.userId = this.data.cache.userId
			return item
		})
	}
}
// inject component method
mix(Page, toast)
new Page()

function clone(o) {
	return JSON.parse(JSON.stringify(o))
}



