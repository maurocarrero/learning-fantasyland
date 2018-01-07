const expect = require('expect');
const { tagged } = require('daggy');

const Any = tagged('Any', [ 'val' ]);

// concat :: Any a => a ~> a -> a
Any.prototype.concat = function (other) {
  return Any(this.val || other.val);
};

// Empty method, check monoids.
Any.empty = () => Any(false);

expect(
  Any(true).concat(Any(false))
).toEqual(Any(true));

expect(
  Any(false).concat(Any(true))
).toEqual(Any(true));

expect(
  Any(true).concat(Any(true))
).toEqual(Any(true));

expect(
  Any(false).concat(Any(false))
).toEqual(Any(false));

expect(
  Any(false).concat(Any(false)).concat(Any(true))
).toEqual(Any(true));

// Associativity:
expect(
  Any(false).concat(Any(false)).concat(Any(true))
).toEqual(
  Any(false).concat(Any(false).concat(Any(true)))
);

module.exports = Any;