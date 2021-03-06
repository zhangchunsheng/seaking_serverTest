/**
 * Author: ZhangChunsheng
 * Date: 2013-10-18
 * Description: httpHelper
 */
var http = require('http');
var querystring = require('querystring');

var httpHelper = module.exports;

httpHelper.request = function(type, host, port, path, headers, params, post_body, cb) {
    var options = {
        host: host,
        port: port,
        path: path,
        headers: headers
    };

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
            var obj = JSON.parse(str);
            if(typeof cb == "function")
                cb(obj);
        });
    }

    http.request(options, callback).end();
}

httpHelper.get = function(host, port, path, headers, params, cb) {
    if(path.indexOf("?") < 0) {
        path = path + "?";
    }

    for(var o in params) {
        path += o + "=" + params[o] + "&";
    }

    path = path.substr(0, path.length - 1);

    var options = {
        host: host,
        port: port,
        path: path,
        headers: headers
    };

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            if(str.indexOf("<") == 0) {
                cb({}, null);
            } else {
                var obj = JSON.parse(str);
                if(typeof cb == "function")
                    cb(obj, response);
            }
        });
    }

    var req = http.request(options, callback);

    req.setTimeout(5000, function() {
        if(typeof cb == "function")
            cb({}, null);
    });

    req.end();
}

httpHelper.post = function(host, port, path, headers, params, post_body, cb) {
    var data = querystring.stringify(post_body);

    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Content-Length'] = Buffer.byteLength(data);
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        headers: headers
    };

    var callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.setEncoding('utf8');

        response.on('end', function () {
            console.log(str);
            var obj = JSON.parse(str);
            if(typeof cb == "function")
                cb(obj);
        });
    }

    var req = http.request(options, callback);

    req.on("error", function(e) {

    });

    req.setTimeout(5000, function() {
        if(typeof cb == "function")
            cb({}, null);
    });

    console.log(data);
    //This is the data we are posting, it needs to be a string or a buffer
    req.write(data);
    req.end();
}

httpHelper.test = function() {
    var request = require('request');
    request.post({
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: 'http://192.168.1.99:8090/induLog/save',
        body: ""
    }, function(error, response, body){
        console.log(body);
    });
}