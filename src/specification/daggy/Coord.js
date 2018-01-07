// Samples taken almost from
// http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
const daggy = require('daggy');
const expect = require('expect');

/**
 * DAGGY Fantasy Land Specification implementation
 *
 * daggy.tagged(typeName, fields)
 * Create a constructor with given property names
 */

//- A coordinate in 3D space.
//+ Coord :: (Int, Int, Int) -> Coord
const Coord = daggy.tagged('Coord', [ 'x', 'y', 'z' ]);

// scale :: Coord ~> Int -> Coord
Coord.prototype.scale = function (n) {
  return Coord(this.x * n, this.y * n, this.z * n)
};

// translate :: Coord ~> Int -> Int -> Int -> Coord
Coord.prototype.translate = function (x, y, z) {
  return Coord(
    this.x + x,
    this.y + y,
    this.z + z
  );
};

const a = Coord(1, 2, 3);
const b = a.scale(2);

console.log('daggy::Coord');
expect(Coord.toString()).toEqual('Coord');
expect(a).toEqual({ x: 1, y: 2, z: 3 });
expect(b).toEqual({ x: 2, y: 4, z: 6 });
expect(a.x === 1 && a.y === 2 && a.z === 3).toEqual(true);
expect(b.x === 2 && b.y === 4 && b.z === 6).toEqual(true);
expect(Coord.is(a)).toEqual(true);
expect(Coord.is(b)).toEqual(true);
expect(a.toString()).toEqual('Coord(1, 2, 3)');
expect(b.toString()).toEqual('Coord(2, 4, 6)');

module.exports = Coord;
