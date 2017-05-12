let we = require('../../we/index.js')
let mix = require('../utils/mix')
let { dateFormat, timeSep } = require('../utils/date')
let local = dateFormat(null, true)

new class extends we.Page {
	data() {
		return {
			tabs: {
				tab: [
					'9楼会议室',
					'11楼会议室'
				],
				active: 0
			},
		
			limit: 5,
			now: local,
			isPrev: false,
			isNext: true,
			bookList: timeSep(8, 20, 30)

		}
	}

	setDateBtnState() {
		let { year, month, date, s } = this.data.now
		let dateLimit = +new Date(year, month - 1, local.date + this.data.limit)

		this.setData({
			isPrev: s > local.s,
			isNext: s < dateLimit
		})
	}

	onTapTab(e) {
		this.setData({
			'tabs.active': e.target.dataset.index
		})
	}

	onPrevDay() {
		let { year, month, date } = this.data.now
		this.setData({
			now: dateFormat(new Date(year, month - 1, Math.max(date - 1, local.date)), true)
		})
		this.setDateBtnState()
	}

	onNextDay() {
		let { year, month, date } = this.data.now
		this.setData({
			now: dateFormat(new Date(year, month - 1, Math.min(date + 1, local.date + this.data.limit)), true)
		})
		this.setDateBtnState()
	}


	onReady() {
		console.log(typeof this.onTapTab)
	}
}



