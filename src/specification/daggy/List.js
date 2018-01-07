// Samples taken almost from
// http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
const daggy = require('daggy');
const expect = require('expect');

/**
 * daggy.taggedSum(typeName, constructors)
 * Creating a SUM TYPE (type with MULTIPLE CONSTRUCTORS)
 */



//- Linked List
const List = daggy.taggedSum('List', {
  //+ List.Cons :: List -> List -> List
  Cons: [ 'head', 'tail' ],
  //+ List ::
  Nil: []
});

const { Cons, Nil } = List;

List.prototype.map = function (f) {
  return this.cata({
    Cons: (head, tail) =>
      Cons(
        f(head),
        tail.map(f)
      ),
    Nil: () => Nil
  });
}

// A static method for convenience:
// Each new item in the list is added as the list's new head item, moving its previous structure as its new tail.
// That's why we use reduceRight, we need to start from the last value in the array in order to prepend (unshift)
// all the rest of the values from there until the first one.
List.from = (xs) => xs.length > 0 ? xs.reduceRight(
    (acc, x) => Cons(x, acc),
    Nil) : Nil;

// And a conversion back for convenience!
List.prototype.toArray = function () {
  return this.cata({
    Cons: (x, acc) => [ x, ...acc.toArray() ],
    Nil: () => []
  });
};

console.log('daggy::List');
expect(typeof Nil).toBe('object')
expect(typeof Cons).toBe('function')

const myList = List.from([ 1, 2, 3, 4, 5 ]);
const myOneItemList = List.from([ 33 ]);

expect(myList.toString()).toEqual('List.Cons(1, List.Cons(2, List.Cons(3, List.Cons(4, List.Cons(5, List.Nil)))))');
expect(myOneItemList.toString()).toEqual('List.Cons(33, List.Nil)');

// EXTRAS
// Add filter method to the List type

List.prototype.filter = function (f) {
  return this.cata({
    Cons: (head, tail) => {

      // An empty list?
      if (head === Nil)
        return Nil;

      // Last item in the list
      if (tail === Nil) {
        return f(head) ?
          Cons(head, Nil)
          :
          Nil;
      }

      // In the middle of the list
      return f(head) ?
        Cons(head, tail.filter(f))
        :
        tail.filter(f);
    },

    Nil: () => []
  });
};

// 5 items list
expect(myList.filter(num => num === 1).toString()).toEqual('List.Cons(1, List.Nil)');
expect(myList.filter(num => num === 2).toString()).toEqual('List.Cons(2, List.Nil)');
expect(myList.filter(num => num === 3).toString()).toEqual('List.Cons(3, List.Nil)');
expect(myList.filter(num => num > 3).toString()).toEqual('List.Cons(4, List.Cons(5, List.Nil))');
expect(myList.filter(num => num > 'Waldemingo').toString()).toEqual('List.Nil');

// 1 item list
expect(myOneItemList.filter(num => num === 33).toString()).toEqual('List.Cons(33, List.Nil)');
expect(myOneItemList.filter(num => num === 'Peteco').toString()).toEqual('List.Nil');

// Empty list
expect(List.from([]).toString()).toEqual('List.Nil');

// Add reduce method to the List type
List.prototype.reduce = function (f, acc) {
  return this.cata({
    Cons: (head, tail) => {

      // An empty list?
      if (head === Nil)
        return Nil;

      // Last item in the list || 1 item list
      if (tail === Nil) {
        return List.Cons(head, tail);
      }

      return List.Cons(
        f(acc || head, tail.head),
        tail.tail
      ).reduce(f);
    }
  });
};

expect(myList.reduce((acc, x) => acc + x, 0).toString()).toEqual('List.Cons(15, List.Nil)');
expect([ 'Abbot', 'Curly', 'Costello', 'Larry', 'Laurel', 'Moe', 'Hardy' ]
  .reduce((acc, x) => `${acc} ${x}`, 'Where are the stooges?').toString()
).toEqual('Where are the stooges? Abbot Curly Costello Larry Laurel Moe Hardy');
expect(myOneItemList.reduce((acc, x) => acc + x).toString()).toEqual('List.Cons(33, List.Nil)');
// expect(Nil.reduce((acc, x) => acc + x, 133).toString()).toEqual('List.Nil');


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

/**
 * Bubble
 * @returns {*}
 */
// bubble :: Ord a => [a] ~> [a] -> [a]
List.prototype.bubble = function () {
  return this.cata({
    Cons: (head, tail) => {
      // If greater than or equal
      if (head.lte(tail.head)) {

        // If are equal keep sorting the tail
        if (head.equals(tail.head)) {
          return List.Cons(
            head,
            tail.bubble()
          );
        }

        // If it is lower than, switch them and keep sorting
        return List.Cons(
          tail.head,
          List.Cons(
            head,
            tail.tail
          )
        ).bubble();
      }

      // If there is nothing to do and we are not at the end of the list, keep sorting the tail.
      const newTail = tail === List.Nil ? tail : tail.bubble();
      const result = List.Cons(
        head,
        newTail
      );

      if (head.lte(newTail.head)) {
        return result.bubble();
      }
      return result;
    },
    Nil: () => List.Nil
  });
};


module.exports = List;
