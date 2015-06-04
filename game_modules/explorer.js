'use strict';
/*global Game, FIND_EXIT_TOP, FIND_EXIT_BOTTOM, FIND_SOURCES, RoomPosition, TOP*/

module.exports = function (creep) {
    var target;
    if (creep.room.name === 'E4N7') {
        if (creep.energy === 0) {
            target = creep.pos.findClosest(FIND_EXIT_TOP);
            console.log('finding top', target);
        } else {
            console.log('finding storage');
            target = creep.pos.findClosest(Game.getCreepsByRole('storage'));
        }
    } else {
        if (creep.energy !== creep.energyCapacity) {
            console.log('finding source');
            target = new RoomPosition(46, 37, 'E4N8');
        } else {
            console.log('finding exit');
            target = creep.pos.findClosest(FIND_EXIT_BOTTOM);
        }
    }
    creep.moveTo(target);
    creep.move(TOP);
    if (creep.room.name === 'E4N8') {
        target = creep.pos.findInRange(FIND_SOURCES);
        if (target) {
            creep.harvest(target);
        }
    } else {
        creep.transferEnergy(target);
    }
}
