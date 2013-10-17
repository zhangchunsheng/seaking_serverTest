/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: roleTest
 */
var os = require('os');

var serverConfig = require('./config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var roleTest = module.exports;

roleTest.testGetMainPlayerCommand = function() {
    var command = 'ab -v 2 -n 1 -c 1 -C connect.sid=s%3AYcm7d4MODUTacVVyDk6r69Gq.eJrQ4paS43jjOvnSfB74he0R3mVeQZUcIhIO4x11tVw http://192.168.1.22:4011/role/getMainPlayer >> test.txt';
}