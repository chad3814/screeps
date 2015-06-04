'use strict';
/*global Game, STRUCTURE_ROAD, STRUCTURE_RAMPART, STRUCTURE_EXTENSION*/

var roads = [
    [[19, 21], 22],
    [[3, 18], 21],
    [22, 21],
    [[3, 22], 20],
    [[3, 18], 19],
    [[22], 19],
    [[4, 19], 18],
    [[21, 22], 18],
    [[5, 20], 17],
    [[22], 17],
    [[10, 11], 16],
    [[13, 22], 16],
    [[11, 12], 15],
    [[14, 15], 15],
    [[18, 22], 15],
    [[12, 13], 14],
    [[15], 14],
    [[19, 21], 14],
    [[13, 15], 13],
    [[20, 21], 13],
    [[14, 15], 12],
    [[20, 21], 12],
    [[15, 16], 11],
    [[20, 24], 11],
    [[16, 24], 10],
    [[21, 24], 9],
    [[22, 24], 8],
    [14, [21, 49]],
    [15, 27],
    [16, 28],
    [17, 29],
    [18, 30],
    [19, 31],
    [20, 32],
    [21, 33],
    [[22, 49], 34],
    [32, 35],
    [33, 36],
    [34, 37],
    [35, 38],
    [36, 39],
    [37, [40, 44]],
    [38, 45],
    [39, 46],
    [40, 47],
    [[41, 44], 48],
    [45, 49],
    [15, [0, 10]],
    [16, 9],
    [47, [34, 37]]
];

var ramparts = [
    [[23, 24], [10, 11]],
    [[3, 4], [18, 19]],
    [[18, 22], [15, 22]],
    [23, [19, 20]]
];

var extensions = [
    [[19, 21], 19],
    [[19, 21], 21],
    [[19, 21], 16],
    [23, 20]
];
var makeSites = function (room, structure, locations) {
    locations.forEach(function (coords) {
        var xs = coords[0];
        var ys = coords[1];
        if (!Array.isArray(xs)) {
            xs = [xs];
        }
        if (!Array.isArray(ys)) {
            ys = [ys];
        }

        var x_low = xs[0];
        var x_high = xs[1] || xs[0];
        var y_low = ys[0];
        var y_high = ys[1] || ys[0];
        var x, y;
        //console.log('x pair:', low, high);
        for (y = y_low; y <= y_high; y += 1) {
            for (x = x_low; x <= x_high; x += 1) {
                room.createConstructionSite(x, y, structure);
            }
        }
    });
};

module.exports = function (creep) {
    //console.log('making roads with', creep.name);
    makeSites(creep.room, STRUCTURE_ROAD, roads);
    makeSites(creep.room, STRUCTURE_RAMPART, ramparts);
    makeSites(creep.room, STRUCTURE_EXTENSION, extensions);
};
