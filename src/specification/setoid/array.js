// Samples taken almost from
// http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
const expect = require('expect');
const Coord = require('../daggy/Coord');

console.log('Setoid::Array');

// equals :: Setoid a => [a] ~> [a] -> Bool
Array.prototype.equals = function (that) {
  if (this.length !== that.length) {
    return false;
  }
  return this.reduce(function (acc, a, idx) {
    acc = a.equals ? a.equals(that[ idx ]) : a === that[ idx ];
    return acc;
  }, true);
};

expect([ 1, 2, 3 ].equals([ 2, 3, 4, 5 ])).toBe(false);
expect([ 1, 2, 3 ].equals([ 2, 3, 4 ])).toBe(false);
expect([ 1, 2, 3 ].equals([ 1, 2, 3 ])).toBe(true);
expect([ Coord(1, 1, 1) ].equals([ Coord(1, 1, 1) ])).toBe(true);
expect([ Coord(1, 1, 1) ].equals([ Coord(2, 2, 2) ])).toBe(false);
