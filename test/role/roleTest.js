/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: roleTest
 */
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    os = require('os'),
    utils = require('../../app/utils/utils');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var roleTest = module.exports;

roleTest.testGetMainPlayerCommand = function() {
    exec(utils.makeABCommand({
        verbosity: 2,
        requests: 1,
        concurrency: 1,
        cookie: "connect.sid=s%3AYcm7d4MODUTacVVyDk6r69Gq.eJrQ4paS43jjOvnSfB74he0R3mVeQZUcIhIO4x11tVw",
        url: "http://192.168.1.22:4011/role/getMainPlayer",
        output: "test.txt"
    }), function(err, stdout, stderr) {
        console.log(stdout);
    });
}