const expect = require('expect');
const { Set }  = require('../setoid');

const mySet = Set([1, 2, 3]);

expect(mySet.toString()).toEqual('Set([1,2,3])');

// Concat as the INTERSECTION between set1 and set2
const intersection = (xs, ys) => {
  const predicate = (x) => xs.indexOf(x) > -1;
  return ys.filter(predicate);
}

// concatI :: Set a, b, c => a -> b -> c
function concatI (xs, ys) {
  return Set(intersection(xs.store, ys.store));
}

// concat :: Semigroup a => Setoid a => a ~> a -> a
Set.prototype.concat = function (other) {
  return concatI(this, other);
};



expect(mySet.concat(Set([2, 4, 5])).toString()).toEqual('Set([2])');
expect(mySet.concat(Set([2, 4, 5, 3, 7])).toString()).toEqual('Set([2,3])');

// Concat as the UNION between set1 and set2
const union = (xs, ys) => xs.concat(ys);

// concatU :: Set a, b, c => a -> b -> c
function concatU (xs, ys) {
  return Set(union(xs.store, ys.store));
}

// concat :: Semigroup a => Setoid a => a ~> a -> a
Set.prototype.concat = function (other) {
  return concatU(this, other);
};

expect(mySet.concat(Set([2, 4, 5])).toString()).toEqual('Set([1,2,3,2,4,5])');
expect(mySet.concat(Set([2, 4, 5, 3, 7])).toString()).toEqual('Set([1,2,3,2,4,5,3,7])');
