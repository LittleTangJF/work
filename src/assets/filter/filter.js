import countryCode from '../../store/modules/jsonData/countryCode.json'

// todo 保留两位小数
let toFixed=(input,num)=>Number(input).toFixed(num);
// todo 格式化日期
let formatDate = (time,format='YY-MM-DD hh:mm:ss')=>{
    if (!time){
        return ''
    }
    let date = new Date(time);
    let year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
        return '0'+index;
    });////开个长度为10的数组 格式为 00 01 02 03
    let newTime = format.replace(/YY/g,year)
        .replace(/MM/g,preArr[month]||month)
        .replace(/DD/g,preArr[day]||day)
        .replace(/hh/g,preArr[hour]||hour)
        .replace(/mm/g,preArr[min]||min)
        .replace(/ss/g,preArr[sec]||sec);
    return newTime;
}
// todo 性别
let gender = (val)=>{
    let name ='';
    val == 0 ? name = '女' : name = '男';
    return name
}
// todo 最大文字数
let textMax = (val,num = 100)=>val.substring(0,num)+'...';
// todo 国家字段 汉化
let countryCodeTran = (val)=>{
    if (!val) {
        return ''
    }
    let _val = countryCode.RECORDS.find((value) => {
        return value.code == val;
    })
    return _val.zh_name
}



export default {
    toFixed,
    formatDate,
    textMax,
    gender,
    countryCodeTran
}

