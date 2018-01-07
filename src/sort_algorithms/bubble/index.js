const expect = require('expect');
const List = require('../../specification/daggy/List');
const bubbleSort = require('./bubble');
const bubbleSortOptimized = require('./bubble-optimized');
const bubbleSortRecursive = require('./bubble-recursive');
const bubbleSortUsingMatrix = require('./bubble-using-matrix');

const {
  FIVE_ELS_ARRAY, FIVE_ELS_ARRAY_SORTED,
  FIVE_ELS_LIST, FIVE_ELS_LIST_SORTED, ONE_EL_ARRAY, TEN_ELS_ARRAY, TEN_ELS_ARRAY_SORTED,
  TEN_ELS_LIST, TEN_ELS_LIST_SORTED, TWO_ELS_ARRAY, TWO_ELS_ARRAY_SORTED, TWO_ELS_LIST, TWO_ELS_LIST_SORTED,
  WORST_CASE_SCENARIO, WORST_CASE_SCENARIO_LIST, WORST_CASE_SCENARIO_LIST_SORTED, WORST_CASE_SCENARIO_SORTED
} = require('../constants');

console.log('\n---- COMPARING ALGORITHMS ----\n')

expect(bubbleSort(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSortUsingMatrix(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSortOptimized(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(bubbleSortRecursive(TWO_ELS_ARRAY)).toEqual(TWO_ELS_ARRAY_SORTED);
expect(TWO_ELS_LIST.bubble()).toEqual(TWO_ELS_LIST_SORTED);

console.log('\n--------------------------------\n')

expect(bubbleSort(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSortUsingMatrix(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSortOptimized(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(bubbleSortRecursive(FIVE_ELS_ARRAY)).toEqual(FIVE_ELS_ARRAY_SORTED);
expect(FIVE_ELS_LIST.bubble()).toEqual(FIVE_ELS_LIST_SORTED);

console.log('\n--------------------------------\n')

expect(bubbleSort(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSortUsingMatrix(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSortOptimized(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(bubbleSortRecursive(TEN_ELS_ARRAY)).toEqual(TEN_ELS_ARRAY_SORTED);
expect(TEN_ELS_LIST.bubble()).toEqual(TEN_ELS_LIST_SORTED);

console.log('\n--------------------------------\n')

expect(bubbleSort(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);
expect(bubbleSortUsingMatrix(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);
expect(bubbleSortOptimized(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);
expect(bubbleSortRecursive(WORST_CASE_SCENARIO)).toEqual(WORST_CASE_SCENARIO_SORTED);
expect(WORST_CASE_SCENARIO_LIST.bubble()).toEqual(WORST_CASE_SCENARIO_LIST_SORTED);

console.log('\n--------------------------------\n')

/**
 * As an Array method
 */
Array.prototype.bubble = bubbleSort;

expect([].bubble()).toEqual([]);
expect(ONE_EL_ARRAY.bubble()).toEqual(ONE_EL_ARRAY);
expect(TWO_ELS_ARRAY.bubble()).toEqual(TWO_ELS_ARRAY_SORTED);
expect(TEN_ELS_ARRAY.bubble()).toEqual(
  TEN_ELS_ARRAY_SORTED
);

console.log('\n--------------------------------\n')

/**
 * PERFORMANCE random measures
 * As an Array method
 */

function makeAListOf100RandomElementsAndSortIt(len) {
  let arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[ i ] = parseInt((Math.random() * len).toString(), 10);
  }

  console.time(`arr ${len} (bubbleSort)`);
  bubbleSort(arr);
  console.timeEnd(`arr ${len} (bubbleSort)`);
  console.log('');
  console.time(`arr ${len} (bubbleSortUsingMatrix)`);
  bubbleSortUsingMatrix(arr);
  console.timeEnd(`arr ${len} (bubbleSortUsingMatrix)`);
  console.log('');
  console.time(`arr ${len} (bubbleSortOptimized)`);
  bubbleSortOptimized(arr);
  console.timeEnd(`arr ${len} (bubbleSortOptimized)`);
  console.log('');
  console.time(`arr ${len} (bubbleSortRecursive)`);
  bubbleSortRecursive(arr);
  console.timeEnd(`arr ${len} (bubbleSortRecursive)`);
  console.log('');
  console.time(`arr ${len} (List.bubble())`);
  List.from(arr).bubble().toString();
  console.timeEnd(`arr ${len} (List.bubble())`);
}

makeAListOf100RandomElementsAndSortIt(10);
console.log('\n--------------------------------\n')
makeAListOf100RandomElementsAndSortIt(100);
console.log('\n--------------------------------\n')
// makeAListOf100RandomElementsAndSortIt(1000);

