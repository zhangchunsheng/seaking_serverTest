/**
 * Author: ZhangChunsheng
 * Date: 2013-10-19
 * Description: equipTest
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

var equipTest = module.exports;

equipTest.testEquip = function(data) {
    abUtil.getRandomCookie(function(cookie) {
        exec(utils.makeABCommand({
            verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
            requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
            concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
            timelimit: serverConfig.abTest[consts.serverType.seaking_server].timelimit,
            cookie: cookie,
            url: abUtil.getEquipUrl(data),
            output: abUtil.getOutputFile("equip")
        }), function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
}

equipTest.testUnequip = function(data) {
    abUtil.getRandomCookie(function(cookie) {
        exec(utils.makeABCommand({
            verbosity: serverConfig.abTest[consts.serverType.seaking_server].verbosity,
            requests: serverConfig.abTest[consts.serverType.seaking_server].requests,
            concurrency: serverConfig.abTest[consts.serverType.seaking_server].concurrency,
            timelimit: serverConfig.abTest[consts.serverType.seaking_server].timelimit,
            cookie: cookie,
            url: abUtil.getUnequipUrl(data),
            output: abUtil.getOutputFile("equip")
        }), function(err, stdout, stderr) {
            console.log(stdout);
        });
    });
}