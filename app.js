/**
 * Author: ZhangChunsheng
 * Date: 2013-10-16
 * Description: app
 */
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    utils = require('./app/utils/utils'),
    os = require('os'),
    roleTest = require('./test/role/roleTest'),
    user = require('./app/ucenter/user'),
    auth = require('./app/seaking_server/auth'),
    role = require('./app/seaking_server/role'),
    player = require('./app/seaking_server/player'),
    testServer = require('./test/testServer'),
    consts = require('./app/consts/consts');

utils.doProcess(process);

var serverConfig = require('./config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

function main() {
    switch(process.env.METHOD) {
        case consts.COMMAND.roleTest.testGetMainPlayerCommand:
            roleTest.testGetMainPlayerCommand();
            break;
        case consts.COMMAND.ucenter.user.autoRegister:
            var num = serverConfig.abTest.registerUserNum;
            user.autoRegister(num);
            break;
        case consts.COMMAND.seaking_server.auth.auth:
            var num = serverConfig.abTest.dayActivityUser;
            auth.auth(num);
            break;
        case consts.COMMAND.seaking_server.role.createMainPlayer:
            role.createMainPlayer();
            break;
        case consts.COMMAND.seaking_server.player.enterIndu:
            player.enterIndu();
            break;
        case consts.COMMAND.abTest.testServer:
            // 一分钟执行一次，执行多个ab test，-n 1200 -c 20
            // 注册一秒钟执行执行 -n 60 -c 1
            testServer.testServer();
            break;
        case consts.COMMAND.userTest.testAutoRegister:
            testServer.testAutoRegister();
            break;
        case consts.COMMAND.roleTest.testCreateMainPlayer:
            testServer.testCreateMainPlayer();
            break;
        default:
            console.log("wrong command");
    }

    //process.exit(0);
}

main();
