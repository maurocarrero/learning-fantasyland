const expect = require('expect');

/**
 * Recursive ANY and ALL
 */

const all = (predicate, list) => {
  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[ i ])) {
      return false;
    }
  }
  return true;
}

const any = (predicate, list) => {
  let len = list.length;
  let i = 0;
  while (i < len) {
    if (predicate(list[ i++ ])) {
      return true;
    }
  }
  return false;
}

const gt3 = (x) => x > 3;
const lt7 = (x) => x < 7;

const list = [ 6, 9, 12, 15, 18 ];

expect(all(gt3, list)).toEqual(true);
expect(all(lt7, list)).toEqual(false);

expect(any(lt7, list)).toEqual(true);
expect(any(gt3, list)).toEqual(true);

const recursiveAll = (predicate, [ first, ...list ]) => {
  if (list.length) {
    return predicate(first) ? recursiveAll(predicate, list) : false;
  }
  return true;
};

const recursiveAny = (predicate, [ first, ...list ]) => {
  if (!list.length) {
    return predicate(first) ? true : recursiveAny(predicate, list);
  }
  return false;
};

expect(recursiveAll(gt3, list)).toEqual(true);
expect(recursiveAll(lt7, list)).toEqual(false);


