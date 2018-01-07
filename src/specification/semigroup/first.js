const expect = require('expect');
const { tagged } = require('daggy');

const First = tagged('First', [ 'val' ]);

// concat :: First a => a ~> a -> a
First.prototype.concat = function () {
  return this;
};

expect(First(1).concat(First(2)).concat(First(123))).toEqual(First(1));

// Associativity:
expect(
  First(1).concat(First(2).concat(First(99))).concat(First(123))
).toEqual(
  First(1).concat(First(2).concat(First(99)).concat(First(123)))
);

module.exports = First;