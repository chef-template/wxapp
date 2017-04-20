exports.getClassMethods = function (obj, excludeMethods = []) {
    let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))

    excludeMethods = ['constructor', ...excludeMethods]
    methods = methods.filter((item) => !~excludeMethods.indexOf(item))

    return methods.reduce((total, val) => {
        total[val] = obj[val].bind(obj)
        return total
    }, {})
}

exports.toPromise = function (target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key.substring(0, 2) === 'on') {
            target[key] = source[key]
        } else if (key.substr(-4) === 'Sync') {
            target[key] = () => new Promise((resolve, reject) => {
                try {
                    resolve(source[key]())
                } catch (e) {
                    reject(e)
                }
            })
        } else {
            target[key] = (obj) => new Promise((resolve, reject) => {
                source[key](Object.assign({}, obj, {
                    fail: reject,
                    success: resolve
                }))
            })
        }
    }
}

exports.mixWxApi = function (target, source) {
    for (let key of Reflect.ownKeys(wx)) {
        target[`$${key}`] = source[key]
    }
}