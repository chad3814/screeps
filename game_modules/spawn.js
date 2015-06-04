'use strict';
/*global Game, WORK, TOUGH, CARRY, MOVE, ATTACK, RANGED_ATTACK, OK, Memory, Spawn*/


var harvester_body = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
var sentry_body = [TOUGH, RANGED_ATTACK, MOVE, MOVE];
var guard_body = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE];
var builder_body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
var repair_body = [WORK, CARRY, CARRY, CARRY, MOVE];
var comando_body = [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE];
var mule_body = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
var transfer_body = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
var storage_body = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE];
var explorer_body = [WORK, CARRY, MOVE, MOVE, MOVE];

var spawn = function (body, role) {
    var num = Game.getNextNumberByRole(role);
    var name = role + '-' + num;
    var ret = this.canCreateCreep(body, name);
    if (ret === OK) {
        this.createCreep(body, name);
        Memory.creeps[name].number = num;
        Memory.creeps[name].role = role;
        console.log('spawning', name);
        return name;
    }
    return null;
};

Spawn.prototype.spawnHarvester = function () {
    return spawn.call(this, harvester_body, 'harvester');
};

Spawn.prototype.spawnSentry = function () {
    return spawn.call(this, sentry_body, 'sentry');
};

Spawn.prototype.spawnGuard = function () {
    return spawn.call(this, guard_body, 'guard');
};

Spawn.prototype.spawnBuilder = function () {
    return spawn.call(this, builder_body, 'builder');
};

Spawn.prototype.spawnRepair = function () {
    return spawn.call(this, repair_body, 'repair');
};

Spawn.prototype.spawnComando = function () {
    return spawn.call(this, comando_body, 'comando');
};

Spawn.prototype.spawnMule = function () {
    return spawn.call(this, mule_body, 'mule');
};

Spawn.prototype.spawnTransfer = function () {
    return spawn.call(this, transfer_body, 'transfer');
};

Spawn.prototype.spawnStorage = function () {
    return spawn.call(this, storage_body, 'storage');
};

Spawn.prototype.spawnExplorer = function () {
    return spawn.call(this, explorer_body, 'explorer');
};
