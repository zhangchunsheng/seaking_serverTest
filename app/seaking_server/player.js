/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: player
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

var player = module.exports;

player.enterIndu = function() {
    utils.getCookies(function(cookies) {
        enterIndu(cookies);
    })
}

function enterIndu(cookies) {
    if(cookies.length == 0)
        return;
    var cookie = cookies.shift();
    var date = new Date();
    var params = {
        induId: "Ins1010"
    };
    seaking_server.enterIndu(cookie.cookie, params, function(data, response) {
        fileHelper.saveData([date.toUTCString(), date.getTime(), cookie.cookie, JSON.stringify(params), JSON.stringify(data)], [], "enterIndu", 'a', function(data) {
            enterIndu(cookies);
        })
    });
}