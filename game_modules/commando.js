'use strict';
/*global Game, FIND_HOSTILE_SPAWNS, FIND_HOSTILE_CREEPS*/

var target_rooms = ['E4N6'];

module.exports = function (creep) {
    //console.log('comando creep:', creep.name);
    if (!creep.memory.target_room) {
        creep.memory.target_room = target_rooms[creep.memory.number % target_rooms.length];
    }
    var exit, spawn, hostile_creeps, hostile_creep;
    if (creep.room.name === 'E4N7') {
        exit = creep.room.findExitTo(creep.memory.target_room);
        creep.moveTo(creep.pos.findClosest(exit));
    } else if (creep.room.name === creep.memory.target_room) {
        // move to base and attack, if there is a hostile
        // creep next to me, attack it
        spawn = creep.pos.findClosest(FIND_HOSTILE_SPAWNS);
        if (spawn) {
            //console.log(creep.name, 'there is a spawn');
            creep.moveTo(spawn);
            hostile_creeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
            if (hostile_creeps.length) {
                creep.attack(hostile_creeps[0]);
            } else {
                creep.attack(spawn);
            }
        } else {
            //console.log(creep.name, 'no spawn');
            hostile_creep = creep.pos.findClosest(FIND_HOSTILE_CREEPS);
            if (hostile_creep) {
                //console.log(creep.name, 'there is a hostile creep');
                creep.moveTo(hostile_creep);
                creep.attack(hostile_creep);
            } else {
                //console.log(creep.name, 'no hostile creep');
                creep.moveTo(creep.room.controller);
                creep.attack(creep.room.controller);
            }
        }
    } else {
        exit = creep.room.findExitTo('E4N7');
        if (exit < 0) {
            console.log(creep.name, 'failed to find an exit to E4N7', exit);
        } else {
            exit = creep.pos.findClosest(exit);
            creep.moveTo(exit);
        }
    }
};
