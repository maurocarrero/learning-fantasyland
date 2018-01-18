const expect = require('expect');

/**
 * Replacing loops with recursive HOFs
 */

const add1 = (x) => x + 1;
const MY_LIST = [ 27, 33, 45, 90, 13 ];
const EXPECTED = [ 28, 34, 46, 91, 14 ]

const forLoop = (list, f) => {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(f(list[ i ]));
  }
  return result;
};

const whileLoop = (list, f) => {
  const result = [];
  let len = list.length;
  let i = 0;
  while (i < len) {
    result.push(f(list[ i++ ]));
  }
  return result;
}

expect(forLoop(MY_LIST, add1)).toEqual(EXPECTED);
expect(whileLoop(MY_LIST, add1)).toEqual(EXPECTED);

const recursiveLoop = ([ first, ...list ], f) => [
  f(first),
  ...(list.length > 0 ? recursiveLoop(list, f) : [])
];

expect(recursiveLoop(MY_LIST, add1)).toEqual(EXPECTED);

