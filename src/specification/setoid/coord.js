// Samples taken almost from
// http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
const expect = require('expect');
const Coord = require('../daggy/Coord');

console.log('Setoid::Coord');

// equals :: Coord ~> Coord -> Boolean
Coord.prototype.equals = function (that) {
  return this.x === that.x
    && this.y === that.y
    && this.z === that.z;
};

expect(Coord(1, 2, 3).equals(Coord(1, 2, 3))).toEqual(true);
expect(Coord(4, 2, 3).equals(Coord(5, 7, 8))).toEqual(false);
