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

var roleTest = module.exports;

roleTest.testGetMainPlayerCommand = function() {
    exec(utils.makeABCommand({
        verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
        requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
        concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
        timelimit: serverConfig.abTest[consts.serverType.seaking_server].timelimit,
        cookie: "connect.sid=s%3AYcm7d4MODUTacVVyDk6r69Gq.eJrQ4paS43jjOvnSfB74he0R3mVeQZUcIhIO4x11tVw",
        url: abUtil.getMainPlayerUrl(),
        output: abUtil.getOutputFile("getMainPlayer")
    }), function(err, stdout, stderr) {
        console.log(stdout);
    });
}

roleTest.testCreateMainPlayer = function(data) {
    abUtil.getRandomCookie(function(cookie) {
        exec(utils.makeABCommand({
            verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
            requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
            concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
            timelimit: serverConfig.abTest[consts.serverType.seaking_server].timelimit,
            cookie: cookie,
            url: abUtil.getCreateMainPlayerUrl(data),
            output: abUtil.getOutputFile("createMainPlayer")
        }), function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
}