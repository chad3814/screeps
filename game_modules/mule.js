'use strict';
/*global Game, FIND_DROPPED_ENERGY, FIND_SOURCES*/

var upgrade = require('harvester').upgrade;

module.exports = function (creep) {
    if (!creep.memory.target_room) {
        var mules = Game.getCreepsByRole('mule');
        var count_right = mules.reduce(function (count, c) {
            if (c.memory.target_room === 'E5N7') {
                return count + 1;
            }
            return count;
        }, 0);
        if (count_right < 6) {
            creep.memory.target_room = 'E5N7';
        } else {
            creep.memory.target_room = 'E4N6';
        }
    }

    var drops;
    if (creep.room.name === 'E4N7') {
        if (creep.energy === creep.energyCapacity) {
            creep.memory.mule_plan = 'upgrade';
        } else if (creep.energy === 0) {
            creep.memory.mule_plan = 'travel_other';
        }
    } else {
        if (creep.energy === creep.energyCapacity) {
            creep.memory.mule_plan = 'travel_mine';
        } else {
            creep.memory.mule_plan = 'harvest';
        }
    }

    var exit;
    if (creep.memory.mule_plan === 'upgrade') {
        upgrade(creep);
        drops = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
        drops.forEach(function (drop) {
            creep.pickup(drop);
        });
    }
    if (creep.memory.mule_plan === 'travel_other') {
        exit = creep.room.findExitTo(creep.memory.target_room);
        creep.moveTo(creep.pos.findClosest(exit));
        drops = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
        drops.forEach(function (drop) {
            creep.pickup(drop);
        });
    }
    if (creep.memory.mule_plan === 'travel_mine') {
        exit = creep.room.findExitTo('E4N7');
        creep.moveTo(creep.pos.findClosest(exit));
        drops = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
        drops.forEach(function (drop) {
            creep.pickup(drop);
        });
    }
    if (creep.memory.mule_plan === 'harvest') {
        var source = creep.room.find(FIND_SOURCES)[0];
        creep.moveTo(source);
        creep.harvest(source);
        drops = creep.pos.findInRange(FIND_DROPPED_ENERGY, 1);
        drops.forEach(function (drop) {
            creep.pickup(drop);
        });
    }
};
