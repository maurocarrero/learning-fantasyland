// Samples taken almost from
// http://www.tomharding.me/2017/04/09/fantas-eel-and-specification-3.5/
const expect = require('expect');
const List = require('../daggy/List');

//+ lte :: Ord a => a ~> a —> Boolean

// Greater than. The OPPOSITE of lte.
// gt :: Ord a => a -> a -> Boolean
const gt = (x, y) => {
  return !lte(x, y);
};

// Greater than or equal
// gte :: Ord a => a -> a -> Boolean
const gte = (x, y) => {
  return gt(x, y) || x.equals(y);
};

// Less than. The OPPOSITE of gte!
// lt :: Ord a => a -> a -> Boolean
const lt = (x, y) => {
  return !gte(x, y);
};

//+ lte :: Ord a => a -> a —> Boolean
const lte = (x, y) => {
  return x.lte(y);
};

// Recursive Ord Definition for List
//+ lte :: Ord a => [a] ~> [a] -> Boolean
List.prototype.lte = function (that) {
  return this.cata({
    Cons: (head, tail) => {
      return that.cata({
        Cons: (head_, tail_) => {
          return head.equals(head_) ? tail.lte(tail_) : head.lte(head_);
        },
        Nil: () => false
      })
    },
    Nil: () => true
  });
}

Number.prototype.equals = function (b) {
  return Number(this) === Number(b);
}

Number.prototype.lte = function (b) {
  return Number(this) >= b;
}

const l1 = List.from([ 1, 2, 3 ]);
const l2 = List.from([ 1, 2, 3, 4 ]);
const l3 = List.from([ 1, 2 ]);

expect(l1.lte(l2)).toEqual(true);
expect(l3.lte(l1)).toEqual(true);
expect(l2.lte(l1)).toEqual(false);


