// Samples taken almost from
// http://www.tomharding.me/2017/03/09/fantas-eel-and-specification-3/
const expect = require('expect');
const Coord = require('../daggy/Coord');
const List = require('../daggy/List');

console.log('Setoid::List');

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
