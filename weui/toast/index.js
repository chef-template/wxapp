module.exports = {
    setToast({ title, content, duration = 800 }) {
        this.setData({
            toast: {
                isShow: true,
                title,
                content
            }
        })
        setTimeout(_ => this.setData({ toast: { isShow: false } }), duration)
    }
}