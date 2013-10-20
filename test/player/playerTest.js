/**
 * Author: ZhangChunsheng
 * Date: 2013-10-19
 * Description: playerTest
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

var playerTest = module.exports;

playerTest.testEnterScene = function(data) {
    abUtil.getRandomCookie(function(cookie) {
        exec(utils.makeABCommand({
            verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
            requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
            concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
            timelimit: serverConfig.abTest[consts.serverType.seaking_server].timelimit,
            cookie: cookie,
            url: abUtil.getEnterSceneUrl(data),
            output: abUtil.getOutputFile("scene")
        }), function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
}

playerTest.testChangeAndGetSceneData = function(data) {
    abUtil.getRandomCookie(function(cookie) {
        exec(utils.makeABCommand({
            verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
            requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
            concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
            timelimit: serverConfig.abTest[consts.serverType.seaking_server].timelimit,
            cookie: cookie,
            url: abUtil.getChangeAndGetSceneDataUrl(data),
            output: abUtil.getOutputFile("scene")
        }), function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
}