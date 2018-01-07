// http://www.tomharding.me/2017/03/21/fantas-eel-and-specification-5/

const daggy = require('daggy');
const expect = require('expect');

/**
 * MONOID:
 * any semigroup with an identity value, that provides an empty method to retrieve it.
 */

const Lang = daggy.tagged('Lang', [ 'name' ]);

Lang.prototype.concat = function (other) {
  return Lang(
    this.name.concat(other.name)
  );
};

Lang.empty = () => Lang('');

/**
 * Laws:
 */

// Identity
expect(
  Lang('elm').concat(Lang.empty) // Identity value
).toEqual(Lang('elm'));

// Associativity
expect(
  Lang('elm').concat(
    Lang('Lua').concat(Lang.empty()))
).toEqual(
  (Lang('elm').concat(Lang('Lua')))
    .concat(Lang.empty()))

const haskell = Lang('haskell');
const javascript = Lang('javascript');

expect(haskell.concat(Lang.empty()).toString()).toEqual('Lang("haskell")');
expect(haskell.concat(javascript).toString()).toEqual('Lang("haskelljavascript")');


// EXAMPLES:

// STRING
// empty :: String a => () -> a
String.empty = () => '';

expect(String.empty().concat('hey')).toEqual('hey');  // Identity law
expect('hey'.concat('ho').concat('let\'s go'))
  .toEqual('hey'.concat('ho'.concat('let\'s go')));   // Associativity

// ARRAY
// empty :: Array a => () -> a
Array.empty = () => [];

expect(
  Array.empty().concat([ 1, 2, 3 ])
).toEqual([ 1, 2, 3 ]);                               // Identity law
expect(
  Array.empty().concat([ 1, 2, 3 ].concat([ 4, 5 ]))
).toEqual([ 1, 2, 3, 4, 5 ]);                         // Associativity

require('./fold');
require('./parallelise');
