const expect = require('expect');
const { tagged } = require('daggy');

// Sum (semigroup).
const Sum = tagged('Sum', [ 'val' ]);

// concat :: Sum a => a ~> a -> a
Sum.prototype.concat = function (other) {
  return Sum(this.val + other.val);
};

// Empty method, check monoids.
Sum.empty = () => Sum(0);

expect(
  Sum(2).concat(Sum(3))
).toEqual(Sum(5));


expect(
  Sum(2).concat(Sum(3)).concat(Sum(5))
).toEqual(Sum(10));


// Associativity:
expect(
  Sum(2).concat(Sum(3).concat(Sum(5)))
).toEqual(Sum(10));

module.exports = Sum;