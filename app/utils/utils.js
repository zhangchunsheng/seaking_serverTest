/**
 * Author: ZhangChunsheng
 * Date: 2013-10-17
 * Description: utils
 */
var os = require('os');

var utils = module.exports;

utils.getABCommand = function() {
    if(os.platform() == "win32") {
        return utils.getWindowsABCommand();
    } else {
        return utils.getLinuxABCommand();
    }
}

utils.getLinuxABCommand = function() {
    var command = "ab -v 2 -n 1 -c 1 'http://211.155.86.237:4011/role/testCreateMainPlayer' >> test.txt";
    return command;
}

utils.getWindowsABCommand = function() {
    var command = "ab -v 2 -n 1 -c 1 http://211.155.86.237:4011/role/testCreateMainPlayer >> test.txt";
    return command;
}

/**
 *
 * @returns {string}
 */
utils.getPlatform = function() {
    return os.platform();
}