const expect = require('expect');
const { tagged } = require('daggy');

// Max
const Max = tagged('Max', [ 'val' ]);

// concat :: Max a => a ~> a -> a
Max.prototype.concat = function (other) {
  return Max(other.val > this.val ? other.val : this.val);
};

// Empty method, check monoids.
Max.empty = () => Max(-Infinity);

expect(Max(2).concat(Max(7))).toEqual(Max(7));

// Associativity:
expect(
  Max(2).concat(Max(7)).concat(24)
).toEqual(
  Max(2).concat(Max(7).concat(24))
);

module.exports = Max;