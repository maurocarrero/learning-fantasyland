const expect = require('expect');

/**
 * MAP and FILTER
 */

const add1 = (x) => x + 1;
const gt40 = (x) => x > 40;

const MY_LIST = [ 27, 33, 45, 90, 13 ];
const MAP_EXPECTED = [ 28, 34, 46, 91, 14 ];
const FILTER_EXPECTED = [ 45, 90 ];

const map = (list, f) => list.map(f);

const filter = (list, predicate) => list.filter(predicate);

expect(map(MY_LIST, add1)).toEqual(MAP_EXPECTED);
expect(filter(MY_LIST, gt40)).toEqual(FILTER_EXPECTED);
