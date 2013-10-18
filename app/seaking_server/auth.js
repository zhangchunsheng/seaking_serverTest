/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: auth
 */
var auth = module.exports;
var fileHelper = require('../lib/file/fileHelper');

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
        console.log(data);
    });
}