/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: utils
 */
var os = require('os');
var consts = require('../consts/consts');
var fileHelper = require('../lib/file/fileHelper');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var utils = module.exports;

utils.invokeCallback = function(cb) {
    if(!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
}

/**
 * getCookies
 * @param next
 */
utils.getCookies = function(next) {
    fileHelper.readFile("data/cookie" + serverConfig.host + ".txt", function(data) {
        var cookies = [];
        var cookie = {};
        var rows = [];
        for(var i = 0 ; i < data.length ; i++) {
            if(data[i].indexOf(" ") < 0)
                continue;
            rows = data[i].split(" ");
            cookie = {};
            cookie.cookie = rows[0];
            cookie.path = rows[1];
            cookie.expires = rows[2];
            cookie.httpOnly = rows[3];
            cookies.push(cookie);
        }

        next(cookies);
    });
}

/**
 *
 * @param process
 */
utils.doProcess = function(process) {
    var argv = process.argv;
    var array = [];
    process.env.METHOD = consts.COMMAND.roleTest.testGetMainPlayerCommand;
    for(var i = 2 ; i < argv.length ; i++) {
        array = argv[i].split("=");
        if(array[0] == "env") {
            process.env.NODE_ENV = array[1];
        } else if(array[0] == "serverType") {
            process.env.SERVER_TYPE = array[1];
        } else if(array[0] == "port") {
            process.env.PORT = array[1];
        } else if(array[0] == "method") {
            process.env.METHOD = array[1];
        }
    }
}

utils.testABCommand = function() {
    if(os.platform() == "win32") {
        return utils.testWindowsABCommand();
    } else {
        return utils.testLinuxABCommand();
    }
}

utils.testLinuxABCommand = function() {
    var command = "ab -v 2 -n 1 -c 1 'http://211.155.86.237:4011/role/testCreateMainPlayer' >> test.txt";
    return command;
}

utils.testWindowsABCommand = function() {
    var command = "ab -v 2 -n 1 -c 1 http://211.155.86.237:4011/role/testCreateMainPlayer >> test.txt";
    return command;
}

utils.addVerbosity = function(command, num) {
    command.push("-v " + num);
}

utils.addRequests = function(command, requests) {
    command.push("-n " + requests);
}

utils.addConcurrency = function(command, concurrency) {
    command.push("-c " + concurrency);
}

utils.addUrl = function(command, url) {
    utils.getUrl(command, url);
}

utils.addOutput = function(command, output) {
    command.push(">> " + output);
}

utils.getABCommand = function(command) {
    return command.join(" ");
}

utils.makeABCommand = function(opts) {
    var command = [];
    command.push("ab");
    if(opts.verbosity) {
        command.push("-v " + opts.verbosity);
    }

    if(opts.requests) {
        command.push("-n " + opts.requests);
    } else {
        command.push("-n 100");
    }

    if(opts.concurrency) {
        command.push("-c " + opts.concurrency);
    } else {
        command.push("-c 10");
    }

    if(opts.cookie) {
        command.push("-C " + opts.cookie);
    }

    if(opts.url) {
        utils.getUrl(command, opts.url);
    } else {
        utils.getUrl(command, "http://www.google.com");
    }

    if(opts.output) {
        command.push(">> " + opts.output);
    }
    return command.join(" ");
}

utils.getUrl = function(command, url) {
    if(os.platform() == "win32") {
        command.push("\"" + url + "\"");
    } else {
        command.push("'" + url + "'");
    }
}

/**
 *
 * @returns {string}
 */
utils.getPlatform = function() {
    return os.platform();
}

utils.random = function(lower, higher) {
    return Math.floor(Math.random() * (higher + 1 - lower)) + lower;
}

utils.getMin = function(num1, num2) {
    if(num1 > num2)
        return num2;
    else
        return num1;
}