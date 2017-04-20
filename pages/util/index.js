exports.timeFormatList = function (start, end, s){
  var r = [], len = (end - start) * 60 / s
  while(len--){
    r[len] = `${getHmTime(start, len * s)}-${getHmTime(start, (len + 1) * s)}`
  }
  return r
}

function getHmTime(h,m){
  return new Date(2017,1,1,h,m).toString().substr(16,5)
}
