export const dateFormat = (date, isAddZero) => {
    date = date ? new Date(date) : new Date()
    let formatter = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millsecond: date.getMilliseconds(),
        s: +date
    }
    isAddZero && Object.keys(formatter).forEach(k => {
        let n = formatter[k]
        formatter[k] = String(n).length == 1 ? `0${n}` : n
    })
    return formatter
}

export const timeSep = (start, end, sep, rest = {hour: 12, msg: '休息一下'}) => {
    let n, r, len, hm
    if (60 % sep !== 0) {
        throw new Error('sep必须可以被60整除')
    }
    n = 60 / sep
    r = []
    len = (end - start) * n
    while (len--) {
        hm = getHmTime(start, len % 2 ? len * sep + 1 : len * sep)
        if(rest.hour == 1 * hm.substr(0,2)){
            r[len] = rest.msg
            len--
            r.splice(len, 1) // 12-13点休息时间
        } else {
            r[len] = `${hm}-${getHmTime(start, (len + 1) * sep)}`
        }
    }
    return r
}

function getHmTime(h, m) {
    return new Date(2017, 1, 1, h, m).toString().substr(16, 5)
}
