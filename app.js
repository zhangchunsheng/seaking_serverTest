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
        default:
            console.log("wrong command");
    }

    //process.exit(0);
}

main();
