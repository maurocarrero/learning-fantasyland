/**
 * Cylinder Surface Area
 *
 * Circle area:
 *    A = 𝛑 . r²
 *
 * Circle circumference:
 *    C = 𝛑 . (2 . r)
 *
 * Rectangle area:
 *    R = b . h
 *
 * Total area:
 *    (2 . C) + R
 */
const expect = require('expect');

function calculateCylinderSurfaceImperative(height, diameter) {
  const pi = Math.PI;
  const pow = Math.pow;

  const r = diameter / 2;
  const circleArea = pi * pow(r, 2);
  const circleCircumference = pi * diameter;

  const C = circleArea * 2;
  const R = circleCircumference * height;

  return Number((C + R).toFixed(2));
}

const runTests = () => {
  console.time('CylinderSurfaceArea::Imperative');
  expect(calculateCylinderSurfaceImperative(10, 20)).toEqual(1256.64) // ~ 1256.64 square units
  console.timeEnd('CylinderSurfaceArea::Imperative');
};

module.exports = {
  calculateCylinderSurfaceImperative,
  runTests
};
