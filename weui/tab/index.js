module.exports = {
    onTapTab(e) {
        this.setData({
            'tabs.active': e.target.dataset.index
        })
    }
}