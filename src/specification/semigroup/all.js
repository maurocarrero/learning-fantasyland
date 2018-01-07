const expect = require('expect');
const { tagged } = require('daggy');

const All = tagged('All', [ 'val' ]);

// concat :: All a => a ~> a -> a
All.prototype.concat = function (other) {
  return All(this.val && other.val);
};

// Empty method, check monoids.
All.empty = () => All(true);

expect(
  All(true).concat(All(false))
).toEqual(All(false));

expect(
  All(false).concat(All(true))
).toEqual(All(false));

expect(
  All(false).concat(All(false))
).toEqual(All(false));

expect(
  All(true).concat(All(true))
).toEqual(All(true));

expect(
  All(false).concat(All(false)).concat(All(true))
).toEqual(All(false));

// Associativity:
expect(
  All(false).concat(All(false)).concat(All(true))
).toEqual(
  All(false).concat(All(false).concat(All(true)))
);