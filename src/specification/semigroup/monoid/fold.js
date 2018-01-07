// http://www.tomharding.me/2017/03/21/fantas-eel-and-specification-5/

const expect = require('expect');
const Max = require('../max');
const Min = require('../min');
const Product = require('../product');
const Sum = require('../sum');

// A friendly neighborhood monoid fold:

// fold :: Monoid m => (a -> m) -> [a] -> m
const fold = (M) => (xs) =>
  xs.reduce((acc, x) =>
    acc.concat(M(x)), M.empty());

const myList = [ 10, 1, 2, 3, 23 ];

expect(
  fold(Sum)(myList)
).toEqual(Sum(39));

expect(
  fold(Max)(myList)
).toEqual(Max(23));

expect(
  fold(Min)(myList)
).toEqual(Min(1))

expect(
  fold(Product)(myList)
).toEqual(Product(1380));


// Identities
expect(
  fold(Sum)([])
).toEqual(Sum(0));

expect(
  fold(Product)([])
).toEqual(Product(1));

expect(
  fold(Min)([])
).toEqual(Min(Infinity));

expect(
  fold(Max)([])
).toEqual(Max(-Infinity));

module.exports = fold;
