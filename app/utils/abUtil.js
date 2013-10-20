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

abUtil.getCreateMainPlayerUrl = function(data) {
    var url = abUtil.getHost(consts.serverType.seaking_server) + "/role/createMainPlayer";
    var params = abUtil.makeParams(data);
    if(params != "")
        url = url + "?" + params;
    return url;
}

abUtil.getBattleUrl = function(data) {
    var url = abUtil.getHost(consts.serverType.seaking_server) + "/battle/battle";
    var params = abUtil.makeParams(data);
    if(params != "")
        url = url + "?" + params;
    return url;
}

abUtil.getMainPlayerUrl = function() {
    return abUtil.getHost(consts.serverType.seaking_server) + "/role/getMainPlayer";
}

abUtil.getStartTaskUrl = function(data) {
    var path = "/task/startTask";
    return abUtil.getUrl(data, path);
}

abUtil.getHandOverTaskUrl = function(data) {
    var path = "/task/handOverTask";
    return abUtil.getUrl(data, path);
}

abUtil.getEnterSceneUrl = function(data) {
    var path = "/player/enterScene";
    return abUtil.getUrl(data, path);
}

abUtil.getChangeAndGetSceneDataUrl = function(data) {
    var path = "/player/changeAndGetSceneData";
    return abUtil.getUrl(data, path);
}

abUtil.getBuyItemUrl = function(data) {
    var path = "/shop/buyItem";
    return abUtil.getUrl(data, path);
}

abUtil.getSellItemUrl = function(data) {
    var path = "/package/sellItem";
    return abUtil.getUrl(data, path);
}

abUtil.getEquipUrl = function(data) {
    var path = "/equip/equip";
    return abUtil.getUrl(data, path);
}

abUtil.getUnequipUrl = function(data) {
    var path = "/equip/unEquip";
    return abUtil.getUrl(data, path);
}

abUtil.getUrl = function(data, path) {
    var url = abUtil.getHost(consts.serverType.seaking_server) + path;
    var params = abUtil.makeParams(data);
    if(params != "")
        url = url + "?" + params;
    return url;
}

abUtil.getHost = function(serverType) {
    return "http://" + serverConfig[serverType].host + ":" + serverConfig[serverType].port;
}

abUtil.makeParams = function(data) {
    var params = "";
    for(var o in data) {
        params += o + "=" + data[o] + "&"
    }
    params = params.substr(0, params.length - 1);
    return params;
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