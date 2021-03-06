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
var dataApi = require('../app/utils/dataApi');

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

    testServer.testStartTask();
    testServer.testHandOverTask();

    testServer.testChangeAndGetSceneData();

    testServer.testShop();

    testServer.testEquip();
    testServer.testUnequip();

    testServer.testLearnSkill();
    testServer.testUpgradeSkill();
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
        index: 2,
        eqId: "W01011",
        pkgType: "weapons",
        playerId: ""
    }
    equipTest.testEquip(data);
}

testServer.testUnequip = function() {
    var data = {
        eqId: "W01011",
        type: "weapon",
        playerId: ""
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
    var currentScene = "city01";
    var shopData = dataApi.shops.findById(currentScene).shopData;
    var num = utils.random(0, shopData.length - 1);
    var wid = shopData[num];
    var random = utils.random(1, 6);
    if(random >= 1 && random <= 3)
        wid = "W01011";
    var data = {
        wid: wid,
        num: 1,
        currentScene: currentScene
    }
    shopTest.testBuyItem(data);
}

testServer.testSellItem = function() {
    var data = {};
    var num = utils.random(1, 9);
    var data = {
        itemId: "W01011",
        index: num,
        itemNum: 1,
        type: "weapons"
    }
    shopTest.testSellItem(data);
}

testServer.testShop = function() {
    var num = utils.random(1, 2);
    if(num == 1) {
        testServer.testBuyItem();
    } else {
        testServer.testSellItem();
    }
}

testServer.testLearnSkill = function() {
    var skills = ["SK01111", "SK01121", "SK01131"];
    var num = utils.random(0, 2);
    var skillId = skills[num];
    var random = utils.random(1, 6);
    if(random >= 1 && random <= 3)
        skillId = "SK01111";
    var data = {
        skillId: skillId
    }
    skillTest.testLearnSkill(data);
}

testServer.testUpgradeSkill = function() {
    var skills = ["SK01111", "SK01112", "SK01113"];
    var num = utils.random(0, 2);
    var skillId = skills[num];
    var random = utils.random(1, 6);
    if(random >= 1 && random <= 3)
        skillId = "SK01111";
    var data = {
        skillId: skillId
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