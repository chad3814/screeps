'use strict';
/*global Game*/

var storage_locations = [
    [23, 10],
    [23, 11]
];

module.exports = function (creep) {
    var transfers = Game.getCreepsByRole('transfer');
    var location = storage_locations.reduce(function (l, p) {
        if (creep.pos.x === p[0] && creep.pos.y === p[1]) {
            return p;
        }
        if (l) {
            return l;
        }
        var spot = creep.room.lookAt(p[0], p[1]);
        var has_creep = spot.some(function (s) {
            return s.type === 'creep';
        });
        if (!has_creep) {
            return p;
        }
        return null;
    }, null);
    if (!location) {
        location = storage_locations[0];
    }
    if (location[0] !== creep.pos.x || location[1] !== creep.pos.y) {
        creep.moveTo(location[0], location[1]);
    }
    creep.transferEnergy(transfers[Game.time % transfers.length]);
};
