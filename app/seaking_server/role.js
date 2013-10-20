/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: role
 */
var auth = module.exports;
var fileHelper = require('../lib/file/fileHelper');
var seaking_server = require('../lib/seaking_server/seaking_server');
var utils = require('../utils/utils');
var httpUtil = require('../utils/httpUtil');

var serverConfig = require('../../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var role = module.exports;

/**
 * createMainPlayer
 */
role.createMainPlayer = function() {
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

        createMainPlayer(cookies);
    });
}

var i = 100000;
function createMainPlayer(cookies) {
    if(cookies.length == 0)
        return;
    var cookie = cookies.shift();
    var date = new Date();
    var params = {
        cId: 1,
        nickname: "a" + i,
        isRandom: 0
    };
    seaking_server.createMainPlayer(cookie.cookie, params, function(data, response) {
        fileHelper.saveData([date.toUTCString(), date.getTime(), cookie.cookie, JSON.stringify(params), JSON.stringify(data)], [], "createMainPlayer", 'a', function(data) {
            i++;
            createMainPlayer(cookies);
        })
    });
}