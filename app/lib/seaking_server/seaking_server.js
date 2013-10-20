/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: seaking_server
 */
var serverConfig = require('../../../config/server');
var httpHelper = require('../http/httpHelper');

var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var seaking_server = module.exports;

seaking_server.auth = function(data, next) {
    var host = serverConfig.seaking_server.host;
    var port = serverConfig.seaking_server.port;
    var path = "/auth";
    var headers = {};

    httpHelper.get(host, port, path, headers, data, function(data, response) {
        next(data, response);
    });
}

seaking_server.createMainPlayer = function(cookie, data, next) {
    var host = serverConfig.seaking_server.host;
    var port = serverConfig.seaking_server.port;
    var path = "/role/createMainPlayer";
    var headers = {
        cookie: cookie
    };

    httpHelper.get(host, port, path, headers, data, function(data, response) {
        next(data, response);
    });
}

seaking_server.enterIndu = function(cookie, data, next) {
    var host = serverConfig.seaking_server.host;
    var port = serverConfig.seaking_server.port;
    var path = "/player/enterIndu";
    var headers = {
        cookie: cookie
    };

    httpHelper.get(host, port, path, headers, data, function(data, response) {
        next(data, response);
    });
}