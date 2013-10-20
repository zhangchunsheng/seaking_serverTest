/**
 * Author: ZhangChunsheng
 * Date: 2013-10-20
 * Description: server
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

var server = module.exports;