const expect = require('expect');
const {
  ONE_EL_ARRAY, TWO_ELS_ARRAY, FIVE_ELS_ARRAY, TEN_ELS_ARRAY, WORST_CASE_SCENARIO,
  TWO_ELS_ARRAY_SORTED, FIVE_ELS_ARRAY_SORTED, TEN_ELS_ARRAY_SORTED, WORST_CASE_SCENARIO_SORTED
} = require('../constants');

const bubbleSortUsingMatrix = function (xs) {
  if (xs.length < 2) {
    return xs;
  }

  let iterations = 0;
  const result = [].concat(xs);
  const n = xs.length;

  // Worst case (n - 1 * n - 1) ---> O pow(n)

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      const aux = result[ i ];
      if (aux < result[ j ]) {
        result[ i ] = result[ j ];
        result[ j ] = aux;
      }
      iterations++;
    }
  }
  console.log('BubbleSort using a Matrix O(n2) / Iterations:', iterations);
  return result;
};

expect(bubbleSortUsingMatrix([])).toEqual([]);
expect(bubbleSortUsingMatrix(ONE_EL_ARRAY)).toEqual(ONE_EL_ARRAY);
expect(bubbleSortUsingMatrix(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSortUsingMatrix(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSortUsingMatrix(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSortUsingMatrix(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);

module.exports = bubbleSortUsingMatrix;