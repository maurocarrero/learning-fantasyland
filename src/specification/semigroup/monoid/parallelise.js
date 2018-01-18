// http://www.tomharding.me/2017/03/21/fantas-eel-and-specification-5/
// An example of parallelism

const expect = require('expect');
const Sum = require('../sum');
const fold = require('./fold');

const THRESHOLD = 5000;

// In practice, we will want a generator,
// Non-tail-recursion is expensive in JS.
const chunk = (xs) => xs.length < THRESHOLD
  ? [ xs ] : [
    xs.slice(0, THRESHOLD),
    ...chunk(xs.slice(THRESHOLD))
  ];

// Dummy
const runThisThingInANewThread = (f, x) => f(x);

const parallelMap = (f) => (xs) =>
  xs.map((x) => runThisThingInANewThread(f, x));

// Chunk, fold in parallel, fold the result.
// In practice, ths would be probably async.
const foldP = (M) => (xs) =>
  anotherFold(M)(parallelMap(fold(M))(chunk(xs)));

// fold :: Monoid m => (a -> m) -> [a] -> m
// fold? :: Monoid m => (a -> m) -> [m] -> m
const anotherFold = (M) => (xs) =>
  xs.reduce((acc, x) => acc.concat(x), M.empty());


// With all that in place...

// Numbers from 0 to 999,999...
const bigList = [ ...Array(1e6) ].map((_, i) => i);

// ... Ta-da! 499999500000
// Parallel-ready map/reduce; isn't it *neat*?
expect(foldP(Sum)(bigList).val).toEqual(499999500000);
