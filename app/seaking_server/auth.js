/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: auth
 */
var auth = module.exports;
var fileHelper = require('../lib/file/fileHelper');
var seaking_server = require('../lib/seaking_server/seaking_server');
var utils = require('../utils/utils');
var httpUtil = require('../utils/httpUtil');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

/**
 * 认证并保存cookie
 */
auth.auth = function() {
    fileHelper.readFile("data/userInfo" + serverConfig.host + ".txt", function(data) {
        var users = [];
        var userInfo = {};
        var rows = [];
        for(var i = 0 ; i < data.length ; i++) {
            if(data[i].indexOf(" ") < 0)
                continue;
            rows = data[i].split(" ");
            userInfo = {};
            userInfo.code = rows[0];
            userInfo.loginName = rows[1];
            userInfo.registerType = rows[2];
            userInfo.sessionId = rows[3];
            userInfo.token = rows[4];
            userInfo.uid = rows[5];
            users.push(userInfo);
        }

        fileHelper.removeFile("data/cookie" + serverConfig.host + ".txt", function(data) {
            saveCookie(users);
        });
    });
}

function saveCookie(users) {
    if(users.length == 0)
        return;
    var user = users.shift();
    seaking_server.auth({
        token: user.token
    }, function(data, response) {
        fileHelper.saveData(httpUtil.getCookie(response.headers["set-cookie"][0]), [], "cookie", 'a', function(data) {
            saveCookie(users);
        })
    });
}