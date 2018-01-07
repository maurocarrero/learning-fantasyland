// Samples taken almost from
// http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/
const daggy = require('daggy');
const expect = require('expect');
const Coord = require('./Coord');

/**
 * DAGGY Fantasy Land Specification implementation
 *
 * daggy.tagged(typeName, fields)
 * Create a constructor with given property names
 */

//- A line between two coordinates.
//+ Line :: (Coord, Coord) -> Line
const Line = daggy.tagged('Line', [ 'from', 'to' ]);

const newCoord = Coord(1, 2, 3);
const myLine = Line(
  newCoord,
  newCoord.translate(1, 2, 3)
);

expect(myLine.toString()).toEqual('Line(Coord(1, 2, 3), Coord(2, 4, 6))');

const myOtherLine = Line('Peteco', 23);

expect(myOtherLine.toString()).toEqual('Line("Peteco", 23)');

module.exports = Line;