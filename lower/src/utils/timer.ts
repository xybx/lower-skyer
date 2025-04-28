/**
 * @description 时间格式化转换
 * @param value
 * @returns {boolean}
 */
export function getDate(time:any,e:string='yyyy-MM-dd hh:mm:ss') {
    /**
     * time :date 类型 可以不传
     * e: 返回格式 yyyy-MM-dd hh:mm:ss (默认) ||  yyyy-MM-dd
     */
    let fmt = e;
    let data = new Date(time || new Date());
    let o:any = {
        "M+": data.getMonth() + 1, //月份
        "d+": data.getDate(), //日
        "h+": data.getHours(), //小时
        "m+": data.getMinutes(), //分
        "s+": data.getSeconds(), //秒
        //季度
        "q+": Math.floor((data.getMonth() + 3) / 3),
        S: data.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (data.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
}
/**
 * @description 前缀
 * @param value
 * @returns {boolean}
 */

export function PrefixInteger(num:any, length:number) {
    return (Array(length).join(num) + num).slice(-length);
}

// 三个月
export function getThreeMonthDay() {
    const startStop = [];
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
    startStop.push(start);
    startStop.push(end);
    return startStop;
}

//去年
export function getLastYear() {
    let startStop = [];
    let currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    currentYear--;
    let priorYearFirstDay = new Date(currentYear, 0, 1);
    let priorYearLastDay = new Date(currentYear, 11, 31);
    startStop.push(priorYearFirstDay);
    startStop.push(priorYearLastDay);
    return startStop;
}
//今年
export function getYear() {
    const startStop = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const d = currentDate.getDate();
    const currentYearFirstDate = new Date(currentYear, 0, 1);
    const currentYearLastDate = new Date(currentYear, m, d);
    startStop.push(currentYearFirstDate);
    startStop.push(currentYearLastDate);
    return startStop;
}
export function timeDate() {
  let time = new Date(); //获取系统当前时间
  let year = time.getFullYear();
  let month:any = time.getMonth() + 1;
  let date:any = time.getDate(); //系统时间月份中的日
  let day = time.getDay(); //系统时间中的星期值
  let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let week = weeks[day]; //显示为星期几
  let hour:any = time.getHours();
  let minutes:any = time.getMinutes();
  let sec:any = time.getSeconds()
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if(sec < 10){
    sec = '0' + sec
  }
  let str = year + "/" + month + "/" + date + "/  " + hour + ":" + minutes + ":" + sec  + week;
  return str
}
export function timeSecond() {
  let time = new Date(); //获取系统当前时间
  let hour:any = time.getHours();
  let minutes:any = time.getMinutes();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let str = hour + ':' + minutes;
  return str
}
export function timeSec() {
  let time = new Date(); //获取系统当前时间
  let hour:any = time.getHours();
  let minutes:any = time.getMinutes();
  let sec:any = time.getSeconds()
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  let str = hour + ':' + minutes + ':' + sec;
  return str
}
export const getYearDay = ()=>{
    let str;
    let time = new Date();
    let year = time.getFullYear();
    let month:any = time.getMonth() + 1;
    let date:any = time.getDate(); //系统时间月份中的日
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    str = year + "年" + month + "月" + date + '日';
    return str
}
export const getWeek = ()=>{
    let str;
    let time = new Date();
    let day = time.getDay(); //系统时间中的星期值
    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let week = weeks[day]; //显示为星期几
    str = week;
    return str
}


export function elChangeExForArray (index1:number, index2:number, array:any) {
  let temp = array[index1]
  array[index1] = array[index2]
  array[index2] = temp
  return array
}
