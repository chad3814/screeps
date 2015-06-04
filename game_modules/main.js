'use strict';
/*global Game*/
require('game');
require('spawn');

var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var sentry = require('sentry');
var repair = require('repair');
var roads = require('roads');
var commando = require('commando');
var mule = require('mule');
var transfer = require('transfer');
var storage = require('storage');
var explorer = require('explorer');

var doEverything = function () {
    var roles = {
        harvester: harvester,
        builder: builder,
        guard: guard,
        sentry: sentry,
        repair: repair,
        commando: commando,
        mule: mule,
        transfer: transfer,
        storage: storage,
        explorer: explorer
    };

    var num_creeps = {};
    var room;
    var done_roads = false;
    Object.keys(roles).forEach(function (role) {
        var creeps = Game.getCreepsByRole(role);
        num_creeps[role] = creeps.length;
        creeps.forEach(function (creep) {
            if (creep.spawning) {
                return;
            }
            if (!done_roads) {
                roads(creep);
                done_roads = true;
            }
            if ((creep.ticksToLive % 120) === 0) {
                creep.say(role);
            }

            roles[role](creep);
            if (!room) {
                room = creep.room;
            }
        });
    });

    //console.log('numbers:', JSON.stringify(num_creeps));
    var spawning = false;
    if (!spawning && num_creeps.harvester < 6) {
        //console.log('try harvester');
        spawning = true;
        Game.spawns.Base.spawnHarvester();
    }
    if (!spawning && num_creeps.guard < 0) {
        //console.log('try guard');
        spawning = true;
        Game.spawns.Base.spawnGuard();
    }
    if (!spawning && num_creeps.builder < 2) {
        //console.log('try builder');
        spawning = true;
        Game.spawns.Base.spawnBuilder();
    }
    if (!spawning && num_creeps.repair < 1) {
        //console.log('try repair');
        spawning = true;
        Game.spawns.Base.spawnRepair();
    }
    if (!spawning && num_creeps.transfer < 2) {
        //console.log('try transfer');
        spawning = true;
        Game.spawns.Base.spawnTransfer();
    }
    if (!spawning && num_creeps.commando < 4) {
        //console.log('try comando');
        spawning = true;
        Game.spawns.Base.spawnCommando();
    }
    if (!spawning && num_creeps.storage < 2) {
        //console.log('try mule');
        spawning = true;
        Game.spawns.Base.spawnStorage();
    }
    if (!spawning) {
        //console.log('try mule');
        spawning = true;
        Game.spawns.Base.spawnMule();
    }
};

doEverything();
