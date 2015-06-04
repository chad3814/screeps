'use strict';
/*global Game*/

module.exports = function (creep) {
/*
    var bad_creep = creep.pos.findClosest(FIND_HOSTILE_CREEPS);
    if (bad_creep) {
        console.log('bad_creep', bad_creep);
        creep.moveTo(bad_creep);
        creep.attack(bad_creep);
    } else {
*/
        creep.moveTo(Game.flags.Lair);
        creep.rangedMassAttack();
    //}
};
