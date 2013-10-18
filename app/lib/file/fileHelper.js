/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: fileHelper
 */
var fs = require("fs");
var path = require('path');
var Buffer = require('buffer').Buffer;

var serverConfig = require('../../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var fileHelper = module.exports;

/**
 *
 * @param data
 * @param fileName
 * @param cb
 */
fileHelper.saveData = function(data, order, fileName, cb) {
    var __parentDir = path.dirname(process.mainModule.filename);
    var stream = fs.createWriteStream(__parentDir + '/data/' + fileName + serverConfig.host + '.txt', {
        encoding: 'utf8',
        flags: 'a'
    });

    var str = "";
    /*for(var i in data) {
        str += i + " ";
    }*/
    if(Object.prototype.toString.call(order) === '[object Array]') {
        for(var i = 0 ; i < order.length ; i++) {
            str += data[order[i]] + " ";
        }
    } else {
        for(var i in data) {
            str += data[i] + " ";
        }
    }
    stream.write(str);

    stream.write("\n");
    stream.end();

    cb(data);
}