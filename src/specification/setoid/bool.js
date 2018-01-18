// Samples taken almost from
// http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
const expect = require('expect');
const Bool = require('../daggy/Bool');

console.log('Setoid::Bool');

// equals :: Bool ~> Bool -> Bool
Bool.prototype.equals = function (that) {
  return this === that;
};

expect(Bool.True.equals(Bool.True)).toBe(true);
expect(Bool.False.equals(Bool.False)).toBe(true);
expect(Bool.False.equals(Bool.True)).toBe(false);
expect(Bool.True.equals(Bool.False)).toBe(false);
