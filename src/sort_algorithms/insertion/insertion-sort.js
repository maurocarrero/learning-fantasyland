const expect = require('expect');
const {
  ONE_EL_ARRAY, TWO_ELS_ARRAY, FIVE_ELS_ARRAY, TEN_ELS_ARRAY, WORST_CASE_SCENARIO,
  TWO_ELS_ARRAY_SORTED, FIVE_ELS_ARRAY_SORTED, TEN_ELS_ARRAY_SORTED, WORST_CASE_SCENARIO_SORTED
} = require('../constants');

const insertionSort = function (xs) {
  if (xs.length < 2) {
    return xs;
  }

  let iterations = 0; // Just for logging number of iterations.
  const result = [].concat(xs);
  const n = xs.length;

  // Worst case ???
  // Compare each n-1 against minor x until its position.
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // console.log(`[${j}][${i}]`);
      const aux = result[ i ];
      if (aux < result[ j ]) {
        result[ i ] = result[ j ];
        result[ j ] = aux;
      }
      iterations++;
    }
  }
  console.log('Insertion Sort? O(n2) / Iterations:', iterations);
  return result;
};

expect(insertionSort([])).toEqual([]);
expect(insertionSort(ONE_EL_ARRAY)).toEqual(ONE_EL_ARRAY);
expect(insertionSort(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(insertionSort(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(insertionSort(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(insertionSort(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);

module.exports = insertionSort;
