// Samples taken almost from
// http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
const daggy = require('daggy');
const expect = require('expect');
const Coord = require('./Coord');

/**
 * daggy.taggedSum(typeName, constructors)
 * Creating a SUM TYPE (type with MULTIPLE CONSTRUCTORS)
 */

// A more complex type Shape, with 2 constructors: Square and Circle that indeed
// receive different set of arguments
const Shape = daggy.taggedSum('Shape', {
  // Square :: (Coord, Coord) -> Shape
  Square: [ 'topleft', 'bottomright' ],

  // Circle :: (Coord, Number) -> Shape
  Circle: [ 'centre', 'radius' ]
});

Shape.prototype.translate = function (x, y, z) {

  // daggy's Killer feature ---> CATAMORPHISM
  return this.cata({
    Square: (topleft, bottomright) =>
      Shape.Square(
        topleft.translate(x, y, z),
        bottomright.translate(x, y, z)
      )
    ,

    Circle: (centre, radio) =>
      Shape.Circle(
        centre.translate(x, y, z),
        radio
      )
  })
};

// So, Shape is a type that can be constructed by giving it either a Square or a Circle:
const myUselessCircle = Shape.Circle(3, 23);
const myUselessSquare = Shape.Square(3, 23);

console.log('daggy::Shape');

// This will work with any value, but in this case for the Circle,
// it makes no sense to pass 2 Numbers, because we need 2 Coord
expect(myUselessCircle.toString()).toEqual('Shape.Circle(3, 23)');

// same with Circle, it makes no sense to give it 2 numbers, it needs a Coord and a Number
expect(myUselessSquare.toString()).toEqual('Shape.Square(3, 23)');

// We cannot use TRANSLATE method of the Shape type in this useless incorrectly constructed myUselessCircle object
expect(function () {
  myUselessCircle.translate(Coord(1, 2, 3))
}).toThrow(TypeError);

// So, let's make sense:
const myHealthySquare = Shape.Square(Coord(0, 0, 0), Coord(10, 10, 10));
const myHealthyCircle = Shape.Circle(Coord(0, 0, 0), 10);

expect(myHealthySquare.toString()).toEqual('Shape.Square(Coord(0, 0, 0), Coord(10, 10, 10))');
expect(myHealthyCircle.toString()).toEqual('Shape.Circle(Coord(0, 0, 0), 10)');

// Now we can use the TRANSLATE method of the Shape type over our healthy Circle object.
expect(
  myHealthyCircle.translate(2, 2, 2).toString()
).toEqual(
  'Shape.Circle(Coord(2, 2, 2), 10)'
);

// And over our healthy Square object
expect(
  myHealthySquare.translate(2, 2, 2).toString()
).toEqual(
  'Shape.Square(Coord(2, 2, 2), Coord(12, 12, 12))'
);
