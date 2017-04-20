module.exports = (opts) => {
    let cache = []

    return (obj) => {
        let requestId, timerId

        obj.method = (obj.method || 'get').toUpperCase()
        obj.header = Object.assign({}, opts.header, obj.header)

        if (!/^https?:\/\//i.test(obj.url) && opts.root) {
            obj.url = `${opts.root}/${obj.url}`.replace(/\/{2,}/g, '/').replace(':/', '://')
        }

        requestId = `${obj.method}${obj.url}${obj.data ? JSON.stringify(obj.data) : ''}`

        if (!~cache.indexOf(requestId)) {
            cache.push(requestId)
        } else {
            console.error('The last request was in the pending state, not to send multiple requests')
            return new Promise(function () {})
        }

        if (obj.method === 'GET' && opts.timestamp) {
            obj.url = `${obj.url}${obj.url.indexOf('?') < 0 ? '?' : '&'}t=${Date.now()}`
        }

        timerId = setTimeout(() => {
            wx.showToast({
                mask: true,
                icon: 'loading',
                title: '获取数据中',
                duration: 1500000
            })
        }, opts.duration)

        return new Promise((resolve, reject) => {
            wx.request(Object.assign({}, obj, {
                fail(err) {
                    if (err.errMsg === 'request:fail') {
                        opts.error('网络超时')
                        return
                    }

                    reject(err)
                },
                success(res) {
                    if (`${res.statusCode}`.charAt(0) === '4') {
                        opts.error('请求资源不存在')
                        return
                    }

                    if (`${res.statusCode}`.charAt(0) === '5') {
                        opts.error('服务器繁忙，请稍后再试')
                        return
                    }
                    
                    resolve(res)
                },
                complete() {
                    wx.hideToast()
                    clearTimeout(timerId)
                    cache.splice(cache.indexOf(requestId), 1)
                }
            }))
        })
    }
}