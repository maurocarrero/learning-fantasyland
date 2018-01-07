const expect = require('expect');
const {
  ONE_EL_ARRAY, TWO_ELS_ARRAY, FIVE_ELS_ARRAY, TEN_ELS_ARRAY, WORST_CASE_SCENARIO,
  TWO_ELS_ARRAY_SORTED, FIVE_ELS_ARRAY_SORTED, TEN_ELS_ARRAY_SORTED, WORST_CASE_SCENARIO_SORTED
} = require('../constants');

const bubbleSortRecursive = function (ys) {
  let iterations = 0;

  function recursive(xs) {
    const result = [].concat(xs);
    const len = xs.length;

    let switched = false;

    if (len < 2) {
      return xs;
    }

    for (let i = 0, j = 1; i < j && j < len; i++, j++) {
      const x = result[ i ];
      if (x > result[ j ]) {
        result[ i ] = result[ j ];
        result[ j ] = x;
        switched = true;
      }
      iterations++;
    }

    if (switched) {
      return recursive(result);
    }

    return result;
  }

  const result = recursive(ys);
  console.log('Recursive bubbleSort O(n2) / Iterations:', iterations);

  return result;
};

expect(bubbleSortRecursive([])).toEqual([]);
expect(bubbleSortRecursive(ONE_EL_ARRAY)).toEqual(ONE_EL_ARRAY);
expect(bubbleSortRecursive(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSortRecursive(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSortRecursive(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSortRecursive(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);

module.exports = bubbleSortRecursive;
