/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-17
 * Description: ucenter
 */
var serverConfig = require('../../../config/server');
var httpHelper = require('../http/httpHelper');

var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var ucenter = module.exports;

ucenter.autoRegister = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/autoRegister";
    var headers = {};

    data.registerType = 2;

    httpHelper.get(host, port, path, headers, data, function(data, response) {
        next(data);
    });
}

ucenter.saveInduLog = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/induLog/save";
    var headers = {};

    data.induData = JSON.stringify(data.induData);

    httpHelper.post(host, port, path, headers, {}, data, function(data) {
        next(data);
    });
}

ucenter.saveTaskLog = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/taskLog/save";
    var headers = {};

    data.taskRecord = JSON.stringify(data.taskRecord);

    httpHelper.post(host, port, path, headers, {}, data, function(data) {
        next(data);
    });
}

ucenter.saveBattleLog = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/battleLog/save";
    var headers = {};

    httpHelper.post(host, port, path, headers, {}, data, function(data) {
        next(data);
    });
}

ucenter.addPlayer = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/user/addPlayer";
    var headers = {};

    httpHelper.get(host, port, path, headers, data, function(data) {
        next(data);
    });
}

ucenter.updatePlayer = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/user/updatePlayer";
    var headers = {};

    httpHelper.get(host, port, path, headers, data, function(data) {
        next(data);
    });
}

ucenter.removePlayer = function(data, next) {
    var host = serverConfig.ucenter.host;
    var port = serverConfig.ucenter.port;
    var path = "/user/removePlayer";
    var headers = {};

    httpHelper.get(host, port, path, headers, data, function(data) {
        next(data);
    });
}