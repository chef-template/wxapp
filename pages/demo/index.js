let we = require('../../we/index.js')

new class extends we.Page {
    data() {
        return {
            grid: [{
                icon: 'assets/icon.png',
                title: 'Grid'
            }, {
                icon: 'assets/icon.png',
                title: 'Grid'
            }, {
                icon: 'assets/icon.png',
                title: 'Grid'
            }],
            radios: [{
                title: '单选1',
                value: '单选1',
                selected: false
            }, {
                title: '单选2',
                value: '单选2',
                selected: true,
                icon: 'assets/icon.png'
            }],
            checkboxs: [{
                title: '多选1',
                value: '多选1',
                selected: false
            }, {
                title: '多选2',
                value: '多选2',
                selected: false
            }, {
                title: '多选3',
                value: '多选3',
                selected: false
            }, {
                title: '多选4',
                value: '多选4',
                selected: false
            }]
        }
    }
    radioChange(e) {
        let radios = this.data.radios.map((item) => {
            return Object.assign({}, item, {
                selected: item.value === e.detail.value
            })
        })

        this.setData({
            'radios': radios
        })
    }
    checkboxChange(e) {
        let checkboxs = this.data.checkboxs.map((item) => {
            return Object.assign({}, item, {
                selected: e.detail.value.indexOf(item.value) !== -1
            })
        })

        this.setData({
            'checkboxs': checkboxs
        })
    }
    onReady() {}
}