/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: roleTest
 */
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    os = require('os'),
    utils = require('../../app/utils/utils'),
    abUtil = require('../../app/utils/abUtil');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var userTest = module.exports;

userTest.testAutoRegister = function() {
    exec(utils.makeABCommand({
        verbosity: 2,
        requests: 1,
        concurrency: 1,
        url: abUtil.getAutoRegisterUrl(),
        output: "autoRegister.txt"
    }), function(err, stdout, stderr) {
        console.log(stdout);
    });
}