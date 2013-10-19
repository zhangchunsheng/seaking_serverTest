/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: abUtil
 */
var consts = require('../consts/consts');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var abUtil = module.exports;

abUtil.getAutoRegisterUrl = function() {
    return abUtil.getHost(consts.serverType.ucenter) + "/autoRegister";
}

abUtil.getHost = function(serverType) {
    return "http://" + serverConfig[serverType].host + ":" + serverConfig[serverType].port;
}