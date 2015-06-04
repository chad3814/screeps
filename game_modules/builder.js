'use strict';
/*global Game, FIND_CONSTRUCTION_SITES*/

var harvester = require('harvester');

var siteDoneness = function (a, b) {
    return (a.progressTotal - a.progress) - (b.progressTotal - b.progress);
};

module.exports = function (creep) {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES).sort(siteDoneness);
    var target = targets[0];
    if (target && target.progress === 0) {
        target = creep.pos.findClosest(FIND_CONSTRUCTION_SITES);
    }
    //console.log(creep.name, target);

    if (creep.energy === 0) {
        creep.memory.builder_plan = 'harvest';
    }

    if (creep.energy === creep.energyCapacity) {
        creep.memory.builder_plan = 'build';
    }

    if (!creep.memory.builder_plan) {
        creep.memory.builder_plan = 'harvest';
    }

    if (creep.memory.builder_plan === 'harvest') {
        harvester(creep);
    }

    if (creep.memory.builder_plan === 'build') {
        //console.log(creep.name, 'build', target);
        if (target) {
            creep.moveTo(target);
            creep.build(target);
        } else {
            harvester(creep);
        }
    }
};
