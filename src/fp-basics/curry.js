const expect = require('expect');
const { curry } = require('ramda');

const addFiveNums = (a, b, c, d, e) => {
  return a + b + c + d + e;
};

expect(addFiveNums(1)).toEqual(NaN);
expect(addFiveNums(1, 2)).toEqual(NaN);
expect(addFiveNums(1, 2, 3)).toEqual(NaN);
expect(addFiveNums(1, 2, 3, 4)).toEqual(NaN);
expect(addFiveNums(1, 2, 3, 4, 5)).toEqual(15);

const curriedAddFiveNums = curry(addFiveNums);

expect(typeof curriedAddFiveNums(1)).toEqual('function');
expect(typeof curriedAddFiveNums(1)(2)).toEqual('function');
expect(typeof curriedAddFiveNums(1)(2)(3)).toEqual('function');
expect(typeof curriedAddFiveNums(1)(2)(3)(4)).toEqual('function');
expect(curriedAddFiveNums(1)(2)(3)(4)(5)).toEqual(15);

// We might need to sum up these numbers:
// 1, 2, 3, 4, 5
// then these others:
// 22, 3, 4, 5, 17
// then these ones:
// 1230, 3, 4, 5, 400527
// so:

expect(addFiveNums(1, 2, 3, 4, 5)).toEqual(15);
expect(addFiveNums(22, 3, 4, 5, 17)).toEqual(51);
expect(addFiveNums(1230, 3, 4, 5, 400527)).toEqual(401769);

// With the curried function, we could do this:
const sum345 = curriedAddFiveNums(3, 4, 5);

expect(sum345(1, 2)).toEqual(15);
expect(sum345(22, 17)).toEqual(51);
expect(sum345(1230, 400527)).toEqual(401769);

