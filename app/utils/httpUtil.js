/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: httpUtil
 */
var httpUtil = module.exports;

httpUtil.getCookie = function(cookie) {
    var array = cookie.split(";");
    var cookies = [];
    for(var i = 0 ; i < array.length ; i++) {
        if(array[i].indexOf("connect.sid") == 0) {
            cookies.push(array[i]);
            array.splice(i, 1);
            break;
        }
    }
    for(var i = 0 ; i < array.length ; i++) {
        cookies.push(array[i]);
    }
    return cookies;
}