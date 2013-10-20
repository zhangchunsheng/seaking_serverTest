/**
 * Author: ZhangChunsheng
 * Date: 2013-10-19
 * Description: battleTest
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

var battleTest = module.exports;

battleTest.testBattle = function(data) {
    abUtil.getRandomCookie(function(cookie) {
        exec(utils.makeABCommand({
            verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
            requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
            concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
            timelimit: 60,
            cookie: cookie,
            url: abUtil.getBattleUrl(data),
            output: abUtil.getOutputFile("battle")
        }), function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
}