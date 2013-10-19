/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: roleTest
 */
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    os = require('os'),
    utils = require('../../app/utils/utils'),
    abUtil = require('../../app/utils/abUtil'),
    consts = require('../../app/consts/consts');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var userTest = module.exports;

userTest.testAutoRegister = function() {
    exec(utils.makeABCommand({
        verbosity: serverConfig.abTest[consts.serverType.ucenter].verbosity,
        requests: serverConfig.abTest[consts.serverType.ucenter].requests,
        concurrency: serverConfig.abTest[consts.serverType.ucenter].concurrency,
        url: abUtil.getAutoRegisterUrl(),
        output: abUtil.getOutputFile("autoRegister")
    }), function(err, stdout, stderr) {
        console.log(stdout);
    });
}