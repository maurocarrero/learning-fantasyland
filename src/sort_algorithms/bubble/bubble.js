const expect = require('expect');
const {
  ONE_EL_ARRAY, TWO_ELS_ARRAY, FIVE_ELS_ARRAY, TEN_ELS_ARRAY, WORST_CASE_SCENARIO,
  TWO_ELS_ARRAY_SORTED, FIVE_ELS_ARRAY_SORTED, TEN_ELS_ARRAY_SORTED, WORST_CASE_SCENARIO_SORTED
} = require('../constants');

const bubbleSort = function (xs = this) {
  if (xs.length < 2) {
    return xs;
  }

  let switched = true;
  let iterations = 0;
  const result = [].concat(xs);

  while (switched) {
    switched = false;
    for (let i = 0, j = 1; i < j && j < xs.length; i++, j++) {
      const x = result[ i ];
      if (x > result[ j ]) {
        result[ i ] = result[ j ];
        result[ j ] = x;
        switched = true;
      }
      iterations++;
    }
  }
  console.log('BubbleSort O(n2) / Iterations:', iterations);
  return result;
};

expect(bubbleSort([])).toEqual([]);
expect(bubbleSort(ONE_EL_ARRAY)).toEqual(ONE_EL_ARRAY);
expect(bubbleSort(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSort(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSort(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSort(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);

module.exports = bubbleSort;