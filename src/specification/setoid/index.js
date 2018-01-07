// Samples taken almost from
// http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
const expect = require('expect');
const { curry } = require('ramda');
const { tagged } = require('daggy');

const Bool = require('../daggy/Bool');
const Coord = require('../daggy/Coord');
const Line = require('../daggy/Line');
const List = require('../daggy/List');
const zipWith = require('../type-signatures');

// equals :: Coord ~> Coord -> Boolean
Coord.prototype.equals = function (that) {
  return this.x === that.x
    && this.y === that.y
    && this.z === that.z;
};

// equals :: Line ~> Line -> Boolean
Line.prototype.equals = function (that) {
  return this.from.equals(that.from)
    && this.to.equals(that.to)
};

// equals :: Bool ~> Bool -> Bool
Bool.prototype.equals = function (that) {
  return this === that;
};

console.log('Setoid');
expect(Bool.True.equals(Bool.True)).toBe(true);
expect(Bool.False.equals(Bool.False)).toBe(true);
expect(Bool.False.equals(Bool.True)).toBe(false);
expect(Bool.True.equals(Bool.False)).toBe(false);


// equals :: Setoid a => [a] ~> [a] -> Bool
List.prototype.equals = function (that) {
  return this.cata({
    Cons: (head, tail) => {
      return head.equals(that.head)
        && tail.equals(that.tail);
    },
    Nil: () => that === List.Nil
  });
};

// Necesitamos que los elementos de la lista sean Setoides de manera de poder ser comparados,
// de otra manera la lista no puede evaluar si es equivalente con otra lista.

const L1 = List.from([ Coord(1, 2, 3), Coord(4, 5, 6) ]);
const L2 = List.from([ Coord(1, 2, 3), Coord(4, 5, 6) ]);
const L3 = List.from([ Coord(1, 2, 3), Coord(10, 8, 5) ]);

expect(L1.equals(L2)).toBe(true);
expect(L1.equals(L3)).toBe(false);

// equals :: Setoid a => [a] ~> [a] -> Bool
Array.prototype.equals = function (that) {
  if (this.length !== that.length) {
    return false;
  }
  return this.reduce(function (acc, a, idx) {
    acc = a.equals ? a.equals(that[ idx ]) : a === that[ idx ];
    return acc;
  }, true);
};

expect([ 1, 2, 3 ].equals([ 2, 3, 4, 5 ])).toBe(false);
expect([ 1, 2, 3 ].equals([ 2, 3, 4 ])).toBe(false);
expect([ 1, 2, 3 ].equals([ 1, 2, 3 ])).toBe(true);
expect([ Coord(1, 1, 1) ].equals([ Coord(1, 1, 1) ])).toBe(true);
expect([ Coord(1, 1, 1) ].equals([ Coord(2, 2, 2) ])).toBe(false);

// nub :: Setoid a => [a] -> [a]
const nub = xs => xs.filter((x, i) => xs.indexOf(x) === i);

// nub :: Setoid a => [a] ~> [a]
Array.prototype.nub = function () {
  return nub(this);
};

expect([ 5, 2, 2, 2, 5, 1, 7, 7 ].nub()).toEqual([ 5, 2, 1, 7 ]);
expect([ 1, 2, 3, 4 ].nub()).toEqual([ 1, 2, 3, 4 ]);

// indexOf :: Setoid a => [a] -> a -> Int
const indexOf = (xs) => x => {
  for (let i = 0; i < xs.length; i++) {
    if (xs[ i ].equals(x))
      return i;
  }
  return -1;
};

// nub_ :: Setoid a  => [a] -> [a]
const nub_ = (xs) => xs.filter((x, i) => {
  return indexOf(xs)(x) === i;
});

expect(nub_([
  Coord(0, 0, 0), Coord(7, 7, 7), Coord(7, 7, 7), Coord(0, 0, 0),
  Coord(0, 0, 0), Coord(0, 0, 0), Coord(7, 7, 7), Coord(7, 7, 7)
])).toEqual([ Coord(0, 0, 0), Coord(7, 7, 7) ]);
expect(nub_([ Coord(0, 0, 0), Coord(7, 7, 7) ])).toEqual([ Coord(0, 0, 0), Coord(7, 7, 7) ]);

// PALINDROME

// palindrome :: Setoid a => [a] -> Bool
const palindrome = (xs) => {
  const len = xs.length;
  for (let i = 0, j = len - 1; i < len && i !== j; i++, j--) {
    if (typeof xs[ i ].equals === 'function') {
      if (!xs[ i ].equals(xs[ j ])) {
        return false;
      }
    } else if (xs[ i ] !== xs[ j ]) {
      return false;
    }
  }
  return true;
};

expect(palindrome([ 1, 2, 3, 4, 4, 3, 2, 1 ])).toEqual(true);
expect(palindrome([ 1, 2, 3, 4, 3, 2, 1 ])).toEqual(true);

expect(palindrome([ 1, 2, 3, 4, 2, 1 ])).toEqual(false);
expect(palindrome([ 1, 2, 4, 3, 2, 1 ])).toEqual(false);

// palindrome :: Setoid a => [a] -> Bool
const palindrome_ = (xs) => {
  let result = true;
  const ys = [ ...xs ].reverse();

  zipWith(curry(function (a, b) {
    if (typeof a.equals === 'function') {
      if (!a.equals(b)) {
        result = false;
      }
    } else if (a !== b) {
      result = false;
    }
  }), xs, ys);
  return result;
};

expect(palindrome_([ 1, 2, 3, 4, 4, 3, 2, 1 ])).toEqual(true);
expect(palindrome_([ 1, 2, 3, 4, 3, 2, 1 ])).toEqual(true);

expect(palindrome_([ 1, 2, 3, 4, 2, 1 ])).toEqual(false);
expect(palindrome_([ 1, 2, 4, 3, 2, 1 ])).toEqual(false);

const Set = tagged('Set', [ 'store' ]);

Set.prototype.add = function (item) {
  if (this.store.indexOf(item) > -1) {
    return false;
  }
  this.store.push(item);
  return this;
};

Set.prototype.remove = function (item) {
  const idx = this.store.indexOf(item);
  if (idx) {
    this.store = [
      ...this.store.slice(0, idx),
      ...this.store.slice(idx + 1)
    ];
  }
  return this;
};

Set.prototype.toString = function () {
  return `Set([${this.store.toString()}])`;
};

const s1 = Set([ 5, 7, 1 ]);

s1.add(9).add(16).add(23);

expect(s1.toString()).toEqual('Set([5,7,1,9,16,23])');

s1.remove(1).remove(16);

expect(s1.toString()).toEqual('Set([5,7,9,23])');

module.exports = Set;
