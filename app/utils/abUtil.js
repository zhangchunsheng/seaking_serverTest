/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: abUtil
 */
var consts = require('../consts/consts');
var utils = require('./utils');
var fileHelper = require('../lib/file/fileHelper');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var abUtil = module.exports;

abUtil.getAutoRegisterUrl = function() {
    return abUtil.getHost(consts.serverType.ucenter) + "/autoRegister";
}

abUtil.getCreateMainPlayerUrl = function() {
    return abUtil.getHost(consts.serverType.seaking_server) + "/role/createMainPlayer";
}

abUtil.getMainPlayerUrl = function() {
    return abUtil.getHost(consts.serverType.seaking_server) + "/role/getMainPlayer";
}

abUtil.getHost = function(serverType) {
    return "http://" + serverConfig[serverType].host + ":" + serverConfig[serverType].port;
}

abUtil.getOutputFile = function(filename) {
    return "abTest/" + filename + ".txt";
}

abUtil.getCookies = function(next) {
    fileHelper.readFile("data/cookie" + serverConfig.host + ".txt", function(data) {
        var cookies = [];
        var cookie = {};
        var rows = [];
        for(var i = 0 ; i < data.length ; i++) {
            if(data[i].indexOf(" ") < 0)
                continue;
            rows = data[i].split(" ");
            cookie = {};
            cookie.cookie = rows[0];
            cookie.path = rows[1];
            cookie.expires = rows[2];
            cookie.httpOnly = rows[3];
            cookies.push(cookie);
        }

        next(cookies);
    });
}

abUtil.getRandomCookie = function(next) {
    abUtil.getCookies(function(cookies) {
        var num = utils.random(0, cookies.length - 1);

        var cookie = cookies[num].cookie;
        next(cookie);
    });
}