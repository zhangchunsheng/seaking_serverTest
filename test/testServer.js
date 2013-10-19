/**
 * Author: ZhangChunsheng
 * Date: 2013-10-19
 * Description: testServer
 */
var userTest = require('./ucenter/userTest');
var roleTest = require('./role/roleTest');
var utils = require('../app/utils/utils');

var serverConfig = require('../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var testServer = module.exports;

testServer.testServer = function() {

}

testServer.testAutoRegister = function() {
    userTest.testAutoRegister();
}

testServer.testCreateMainPlayer = function() {
    roleTest.testCreateMainPlayer();
}