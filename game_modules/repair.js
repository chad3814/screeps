'use strict';
/*global Game, FIND_MY_STRUCTURES*/

var builder = require('builder');

module.exports = function (creep) {
    var targets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function (object) {
            var down = object.hitsMax - object.hits;
            return (down / object.hitsMax) > 0.1;
        }
    });

    //console.log(creep.name, 'number of repair targets:', targets.length);
    if (targets.length === 0) {
        builder(creep);
        return;
    }
    var target = targets.reduce(function (t, a) {
        //var t_percent = (t.hitsMax - t.hits) / t.hitsMax;
        //var a_percent = (a.hitsMax - a.hits) / a.hitsMax;
        //if (t_percent > a_percent) {
        if (t.hits < a.hits) {
            return t;
        }
        return a;
    });

    if (target && creep.energy === 0) {
        if (Game.spawns.Base.energy === 0) {
            builder(creep);
        } else {
            creep.moveTo(Game.spawns.Base);
            Game.spawns.Base.transferEnergy(creep);
        }
    } else {
        if (target) {
            //console.log(creep.name, target);
            creep.moveTo(target);
            creep.repair(target);
        } else {
            builder(creep);
        }
    }
};
