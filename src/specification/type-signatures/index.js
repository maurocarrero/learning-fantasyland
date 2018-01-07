// Samples taken almost from
// http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
const expect = require('expect');
const curry = require('ramda/src/curry');

// add :: num -> num -> num

// would be something like:
// add :: arg -> arg -> return
// add :: a -> b -> c
// add :: Int -> Int -> Int
const add = curry((a, b) => a + b);

/**
 * TYPE VARIABLES: a, b and c can be onf ANY type
 */
// zipWidth :: (a -> b -> c)
//    -> [a] -> [b] -> [c]

/**
 * CONCRETE TYPES: we know the concrete types now.
 */
// zipWith :: (Int -> Int -> Int)
//    -> [Int] -> [Int] -> [Int]
const zipWith = curry((f, xs, ys) => {
  const length = Math.min(xs.length, ys.length);

  const zs = Array(length);

  for (let i = 0; i < length; i += 1) {
    zs[ i ] = f(xs[ i ])(ys[ i ]);
  }

  return zs;
});

expect(
  zipWith(add)([ 1, 2 ])([ 4, 5, 6 ])
).toEqual([ 5, 7 ]);


// filter an array by a predicate.
// filter :: (a -> Bool) -> [a] -> [a]
const filter = curry(p => xs => xs.filter(p));

expect(filter(x => x > 2)([1, 2, 3, 4])).toEqual([3, 4]);

module.exports = zipWith;