module.exports = (opts) => {
    return (obj) => {
        let meta, result, queryString

        if (typeof obj === 'string') {
            obj = { url: obj }
        }
        
        if (!!~obj.url.indexOf('?')) {
            [obj.url, queryString] = obj.url.split('?')
        }

        meta = opts.maps[obj.url] || { url: obj.url }
        
        if (queryString) {
            meta.url = `${meta.url}?${queryString}`
        }
        
        result = Reflect.ownKeys(obj.query || {}).reduce((total, current) => {
            return total.push(`${current}=${obj.query[current]}`), total
        }, []).join('&')
        
        wx.navigateTo({
            url: result ? `${meta.url}${!~meta.url.indexOf('?') ? '?' : ''}${result}`: meta.url,
            fail: obj.fail,
            complete: obj.complete,
            success(result) {
                if (meta.title) {
                    wx.setNavigationBarTitle({ title: meta.title })
                }

                if (obj.success) {
                    obj.success(result)
                }
            }
        })
    }
}