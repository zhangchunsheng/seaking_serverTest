/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: user
 */
var ucenter = require('../lib/ucenter/ucenter');
var fileHelper = require('../lib/file/fileHelper');

var user = module.exports;

/**
 * 注册并保存用户信息
 */
user.autoRegister = function(num) {
    var order = ["code", "loginName", "registerType", "sessionId", "token", "uid"];
    ucenter.autoRegister({}, function(data) {
        fileHelper.saveData(data, order, "userInfo", 'a', function(data) {
            console.log("data has saved");
            num--;
            if(num == 0) {
                console.log("task has completed");
            } else {
                user.autoRegister(num);
            }
        })
    });
}