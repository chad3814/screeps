'use strict';
/*global Game, FIND_MY_STRUCTURES, STRUCTURE_EXTENSION, FIND_DROPPED_ENERGY, FIND_SOURCES_ACTIVE, OK, ERR_TIRED*/

//var flags = [Game.flags.Waiting1, Game.flags.Waiting2];
var flags = [Game.flags.Waiting2];

var getNeedyExtensions = function (creep) {
    var extensions = creep.room.find(FIND_MY_STRUCTURES).filter(function (structure) { return structure.structureType === STRUCTURE_EXTENSION; });
    return extensions.filter(function (extension) { return extension.energy !== extension.energyCapacity; });
};

var refillOrUpgrade = function (creep) {
    var needy_extensions = getNeedyExtensions(creep);

    if (needy_extensions.length === 0 || Game.spawns.Base.energy === 0) {
        if (Game.spawns.Base.energy === Game.spawns.Base.energyCapacity) {
            creep.memory.plan = 'upgrade';
        } else {
            creep.memory.plan = 'refill';
        }
    } else {
        creep.memory.plan = 'refill_extension';
    }

    if (creep.memory.plan === 'refill_extension' && needy_extensions.length === 0) {
        creep.memory.plan = 'refill';
    }

    if (Game.spawns.Base.energy === Game.spawns.Base.energyCapacity && creep.memory.plan === 'refill') {
        if (needy_extensions.length === 0) {
            creep.memory.plan = 'upgrade';
        } else {
            creep.memory.plan = 'refill_extension';
        }
    }

    if (creep.memory.plan === 'upgrade' && !creep.room.controller) {
        if (needy_extensions.length === 0) {
            creep.memory.plan = 'refill';
        } else {
            creep.memory.plan = 'refill_extension';
        }
    }
};

var controller_positions = [
    [23, 11],
    [23, 10],
    [24, 9]
];

var upgrade = function (creep) {
    var storages = Game.getCreepsByRole('storage');
    var storage;
    if (storages.length === 0) {
        // must be spawning, we'll just pretend the flag is it
        storage = Game.flags.Waiting1;
    } else {
        storage = creep.pos.findClosest(storages);
    }
    creep.moveTo(storage);
    creep.transferEnergy(storage);
};

module.exports = function (creep) {
    var needy_extensions = getNeedyExtensions(creep);

    //console.log('creep', creep.name, 'energy', creep.energy);
    var dropped = creep.room.find(FIND_DROPPED_ENERGY);
    var closest_flag = creep.pos.findClosest(flags);

    if (creep.energy === 0) {
        creep.memory.plan = 'harvest';
    }

    if (creep.energy === creep.energyCapacity) {
        refillOrUpgrade(creep);
    }


    if (!creep.memory.plan) {
        creep.memory.plan = 'harvest';
    }

    if (creep.memory.plan === 'harvest') {
        if (dropped.length) {
            dropped = creep.pos.findClosest(FIND_DROPPED_ENERGY);
            creep.moveTo(dropped);
            creep.pickup(dropped);
        } else {
            var source = creep.pos.findClosest(FIND_SOURCES_ACTIVE);
            if (source) {
                var res = creep.moveTo(source);
                creep.harvest(source);
                if (res !== OK && res !== ERR_TIRED) {
                    console.log(creep.name, 'couldn\'t move to', source, res);
                }
            } else {
                if (creep.energy === 0) {
                    creep.moveTo(closest_flag);
                } else {
                    refillOrUpgrade(creep);
                }
            }
        }
    }

    if (creep.memory.plan === 'upgrade') {
        upgrade(creep);
    }

    if (creep.memory.plan === 'refill') {
        creep.moveTo(Game.spawns.Base);
        creep.transferEnergy(Game.spawns.Base);
        creep.memory.plan = 'harvest';
    }

    if (creep.memory.plan === 'refill_extension') {
        var extension = creep.pos.findClosest(needy_extensions);
        creep.moveTo(extension);
        creep.transferEnergy(extension);
        needy_extensions = getNeedyExtensions(creep);
        if (needy_extensions.length === 0) {
            creep.memory.plan = 'harvest';
        }
    }

    // console.log(creep.name, 'plan:', creep.memory.plan);
};

module.exports.upgrade = upgrade;
