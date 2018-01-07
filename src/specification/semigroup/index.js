

const expect = require('expect');

/**
 * SEMIGROUP - FantasyLand specification
 * https://github.com/fantasyland/fantasy-land#semigroup
 * http://www.tomharding.me/2017/03/13/fantas-eel-and-specification-4/
 *
 * We combine values using semigroups.
 *
 * 1. must have a .concat method:
 * concat :: Semigroup a => a ~> a -> a
 *
 * 2. should respect associativity law:
 * a.concat(b.concat(c)) === a.concat(b).concat(c)
 */


// JS String is already a FantasyLand-compliant Semigroup

console.log('Semigroup');
expect('hello '.concat('world')).toEqual('hello world');

// Law: ASSOCIATIVITY
expect(
  'hello '.concat(', ').concat('world!')
).toEqual(
  'hello '.concat(', '.concat('world!'))
);

// JS Array is a Semigroup as well

expect(
  [ 1, 2 ].concat([ 3, 4 ])
).toEqual(
  [ 1, 2, 3, 4 ]
);

expect(
  [ 1, 2 ].concat([ 3, 4 ]).concat([ 5, 6 ])
).toEqual(
  [ 1, 2 ].concat([ 3, 4 ].concat([ 5, 6 ]))
);

require('./sum');
require('./product');
require('./max');
require('./min');

// 2 Semigroup instances for booleans
require('./any');
require('./all');

require('./first');
require('./last');

require('./tuple');
require('./monoid');
