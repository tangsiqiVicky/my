import { url } from "../serviceAPI.config"
export function getTimeS(time) {
    let date = new Date(time)
    let yy = date.getFullYear()
    let MM = date.getMonth() + 1
    let dd = date.getDate()
        // let hh = date.getHours()
        // let mm = date.getMinutes()
        // let ss = date.getSeconds()
    let newTime = getTime(yy) + "-" + getTime(MM) + "-" + getTime(dd) + " " + date.toTimeString().substr(0, 5)
    return newTime
}
export function getTimeSS(time) {
    let date = new Date(time)
    let yy = date.getFullYear()
    let MM = date.getMonth() + 1
    let dd = date.getDate()
        // let hh = date.getHours()
        // let mm = date.getMinutes()
        // let ss = date.getSeconds()
    let newTime = getTime(yy) + "-" + getTime(MM) + "-" + getTime(dd)
    return newTime
}
export function toMoney(money = 0) {
    return money.toFixed(2)
}
export function imgUrl(imgUrl) {
    let picUrl = url + imgUrl
    return picUrl
}
// 时间日期处理
function getTime(time) {
    return time < 10 ? "0" + time : time
}