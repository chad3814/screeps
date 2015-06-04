'use strict';
/*global Game, FIND_HOSTILE_CREEPS*/

module.exports = function (creep) {
    var spawn = Game.spawns.Spawn1;
    var spawn_creeps = spawn.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if (spawn_creeps.length) {
        creep.moveTo(spawn_creeps[0]);
    } else if (creep.memory.flag) {
        creep.moveTo(Game.flags[creep.memory.flag]);
    }
    creep.rangedMassAttack();
};
