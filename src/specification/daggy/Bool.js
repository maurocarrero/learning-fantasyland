// Samples taken almost from
// http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
const daggy = require('daggy');
const expect = require('expect');

/**
 * daggy.taggedSum(typeName, constructors)
 * Creating a SUM TYPE (type with MULTIPLE CONSTRUCTORS)
 */

// Two different forms of the Bool type: True | False
// so we need two constructors:

const Bool = daggy.taggedSum('Bool', {
  True: [],
  False: []
});

console.log('daggy::Bool');
expect(Bool.True.toString()).toEqual('Bool.True');
expect(Bool.False.toString()).toEqual('Bool.False');

// Flip the value.
Bool.prototype.invert = function () {
  return this.cata({
    False: () => Bool.True,
    True: () => Bool.False
  });
};

expect(() => Bool.True(20))
  .toThrow(TypeError);

expect(Bool.True.invert().toString()).toEqual('Bool.False');
expect(Bool.False.invert().toString()).toEqual('Bool.True');

Bool.prototype.thenElse = function (then, or) {
  return this.cata({
    True: then,
    False: or
  })
};

expect(Bool.True.thenElse(() => 'THEN', null).toString()).toEqual('THEN');
expect(Bool.False.thenElse(null, () => 'ELSE').toString()).toEqual('ELSE');

module.exports = Bool;
