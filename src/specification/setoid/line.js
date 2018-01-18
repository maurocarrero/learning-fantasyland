// Samples taken almost from
// http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
const expect = require('expect');

const Coord = require('../daggy/Coord');
const Line = require('../daggy/Line');

console.log('Setoid::Line');

// equals :: Line ~> Line -> Boolean
Line.prototype.equals = function (that) {
  return this.from.equals(that.from)
    && this.to.equals(that.to)
};

expect(
  Line(Coord(1, 2, 3), Coord(4, 5, 6))
    .equals(
      Line(Coord(1, 2, 3), Coord(4, 5, 6))
    )).toEqual(true);
