/**
 * Author: ZhangChunsheng
 * Date: 2013-10-19
 * Description: testServer
 */
var userTest = require('./ucenter/userTest');
var roleTest = require('./role/roleTest');
var battleTest = require('./battle/battleTest');
var equipTest = require('./equip/equipTest');
var induTest = require('./indu/induTest');
var playerTest = require('./player/playerTest');
var shopTest = require('./shop/shopTest');
var skillTest = require('./skill/skillTest');
var taskTest = require('./task/taskTest');
var utils = require('../app/utils/utils');

var serverConfig = require('../config/server');
var env = process.env.NODE_ENV || 'development';
if(serverConfig[env]) {
    serverConfig = serverConfig[env];
}

var testServer = module.exports;

testServer.testServer = function() {
    // ucenter
    testServer.testAutoRegister();

    // seaking_server
    testServer.testBattle();
}

testServer.testAutoRegister = function() {
    userTest.testAutoRegister();
}

testServer.testCreateMainPlayer = function() {
    var data = {
        cId: 1,
        nickname: "w100000",
        isRandom: 0
    }
    roleTest.testCreateMainPlayer(data);
}

testServer.testBattle = function() {
    var data = {
        eid: "MG101011"
    }
    battleTest.testBattle(data);
}

testServer.testEquip = function() {
    var data = {
        eid: "MG101011"
    }
    equipTest.testEquip(data);
}

testServer.testUnequip = function() {
    var data = {
        eid: "MG101011"
    }
    equipTest.testUnequip(data);
}

testServer.testTriggerEvent = function() {
    var data = {
        eid: "MG101011"
    }
    induTest.testTriggerEvent(data);
}

testServer.testEnterScene = function() {
    var data = {

    }
    playerTest.testEnterScene(data);
}

testServer.testChangeAndGetSceneData = function() {
    var currentScene = "city01";
    var target = "city02";
    var temp = "";
    var num = utils.random(1, 2);
    if(num == 2) {
        temp = currentScene;
        currentScene = target;
        target = temp;
    }
    var data = {
        currentScene: currentScene,
        target: target
    }
    playerTest.testChangeAndGetSceneData(data);
}

testServer.testBuyItem = function() {
    var data = {
        eid: "MG101011"
    }
    shopTest.testBuyItem(data);
}

testServer.testSellItem = function() {
    var data = {
        eid: "MG101011"
    }
    shopTest.testSellItem(data);
}

testServer.testLearnSkill = function() {
    var data = {
        eid: "MG101011"
    }
    skillTest.testLearnSkill(data);
}

testServer.testUpgradeSkill = function() {
    var data = {
        eid: "MG101011"
    }
    skillTest.testUpgradeSkill(data);
}

testServer.testStartTask = function() {
    var data = {
        taskId: "Task10101"
    }
    taskTest.testStartTask(data);
}

testServer.testHandOverTask = function() {
    var data = {
        taskId: "Task10101"
    }
    taskTest.testHandOverTask(data);
}