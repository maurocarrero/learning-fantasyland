const expect = require('expect');
const { tagged } = require('daggy');

const Min = tagged('Min', [ 'val' ]);

// concat :: Min a => a ~> a -> a
Min.prototype.concat = function (other) {
  return Min(other.val < this.val ? other.val : this.val);
};

// Empty method, check monoids.
Min.empty = () => Min(Infinity);

expect(Min(2).concat(Min(7))).toEqual(Min(2));

expect(
  Min(2).concat(Min(7)).concat(24)
).toEqual(
  Min(2)
);

// Associativity:
expect(
  Min(2).concat(Min(7)).concat(24)
).toEqual(
  Min(2).concat(Min(7).concat(24))
);

module.exports = Min;