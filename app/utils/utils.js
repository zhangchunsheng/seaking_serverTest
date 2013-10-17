/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: utils
 */
var os = require('os');

var utils = module.exports;

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
        command.push(url);
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