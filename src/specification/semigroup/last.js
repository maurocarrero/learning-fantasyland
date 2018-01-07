const expect = require('expect');
const { tagged } = require('daggy');

const Last = tagged('Last', [ 'val' ]);

// concat :: Last a => a ~> a -> a
Last.prototype.concat = function (other) {
  return other;
};

expect(Last(1).concat(Last(2)).concat(Last(123))).toEqual(Last(123));

// Associativity:
expect(
  Last(1).concat(Last(2).concat(Last(99))).concat(Last(123))
).toEqual(
  Last(1).concat(Last(2).concat(Last(99)).concat(Last(123)))
);
