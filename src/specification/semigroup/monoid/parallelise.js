// http://www.tomharding.me/2017/03/21/fantas-eel-and-specification-5/

// An example of parallelism
const Sum = require('../sum');
const fold = require('./fold');

const THRESHOLD = 5000;

// In practice, we will want a generator, Non-tail-recursion is expensive in JS.
const chunk = (xs) => xs.length < THRESHOLD
  ?
  [ xs ]
  :
  [
    xs.slice(0, THRESHOLD),
    ...chunk(xs.slice(THRESHOLD))
  ];

const runThisThingInANewThread = (f, x) => f(x);

const parallelMap = (f) => (xs) => xs.map(x => runThisThingInANewThread(f, x));

// Chunk, fold in parallel, fold the result.
// In practice, ths would be probably async.
const foldP = (M) => (xs) =>
  fold(M)(parallelMap(fold(M))(chunk(xs)));

// With all that in place...

// Numbers from 0 to 999,999...
// const bigList = [ ...Array(1e6) ].map((_, i) => i);
const bigList = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
// ... Ta-da! 499999500000
// Parallel-ready map/reduce; isn't it *neat*?
console.log(foldP(Sum)(bigList).toString());