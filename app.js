/**
 * Author: ZhangChunsheng
 * Date: 2013-10-16
 * Description: app
 */
var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    utils = require('./app/utils/utils'),
    os = require('os');

function main() {
    exec(utils.getABCommand(), function(err, stdout, stderr) {
        console.log(stdout);
    });
    //process.exit(0);
}

main();
