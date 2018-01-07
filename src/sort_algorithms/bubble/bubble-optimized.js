const expect = require('expect');
const {
  ONE_EL_ARRAY, TWO_ELS_ARRAY, FIVE_ELS_ARRAY, TEN_ELS_ARRAY, WORST_CASE_SCENARIO,
  TWO_ELS_ARRAY_SORTED, FIVE_ELS_ARRAY_SORTED, TEN_ELS_ARRAY_SORTED, WORST_CASE_SCENARIO_SORTED
} = require('../constants');

const bubbleSortOptimized = function (xs) {
  if (xs.length < 2) {
    return xs;
  }
  let n = xs.length;
  const result = [].concat(xs);
  let iterations = 0;
  while (n > 0) {
    let newN;
    for (let i = 0, j = 1; i < j && j < xs.length; i++, j++) {
      const x = result[ i ];
      if (x > result[ j ]) {
        result[ i ] = result[ j ];
        result[ j ] = x;
        newN = i;
      }
      iterations++;
    }
    n = newN;
  }
  console.log('Optimized bubbleSort O(n2) / Iterations:', iterations);
  return result;
};

expect(bubbleSortOptimized([])).toEqual([]);
expect(bubbleSortOptimized(ONE_EL_ARRAY)).toEqual(ONE_EL_ARRAY);
expect(bubbleSortOptimized(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSortOptimized(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSortOptimized(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSortOptimized(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);

module.exports = bubbleSortOptimized;
