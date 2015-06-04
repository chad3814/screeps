'use strict';
/*global Game:true*/

var creepSorter = function (a, b) {
    return a.memory.number - b.memory.number;
};

Game.getCreepsArray = function () {
    return Object.keys(this.creeps).map(function (creep_name) {
        return this.creeps[creep_name];
    }, this);
};

Game.getCreepsByRole = function (role) {
    return this.getCreepsArray().filter(function (creep) {
        return creep.memory.role === role;
    });
};

Game.getNextNumberByRole = function (role) {
    var creeps = this.getCreepsByRole(role);
    if (creeps.length === 0) {
        return 0;
    }
    creeps.sort(creepSorter);
    var last = creeps.pop();
    return last.memory.number + 1;
};

Game.announceRoles = function (role) {
    var creeps;
    if (role) {
        creeps = Game.getCreepsByRole(role);
    } else {
        creeps = Game.getCreepsArray();
    }
    creeps.forEach(function (creep) {
        creep.say(creep.memory.role);
    });
    return creeps.length;
};

Game.killOldest = function (role) {
    var creeps = Game.getCreepsByRole(role);
    var creep = creeps.reduce(function (k, c) {
        if (k.ticksToLive < c.ticksToLive && !k.spawning) {
            return k;
        }
        return c;
    });
    if (creep.spawning) {
        console.log('none to kill');
    }
    console.log('so long', creep.name);
    creep.suicide();
};

var dump = function (o, i) {
    i = i || '';
    if (typeof o !== 'object') {
        if (o === undefined) {
            return '<undefined>';
        }
        return o.toString();
    }
    if (o === null) {
        return '<null>';
    }

    var k;
    var s = '{\n';
    i += '    ';
    for (k in o) {
        s += i + k + ': ' + dump(o[k], i) + '\n';
    }
    return s + '}';
};

Game.dump = dump;
