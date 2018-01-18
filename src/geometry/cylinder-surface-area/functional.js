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
const { curry } = require('ramda');

const PI = () => Math.PI; // K combinator

const sum = curry((x, y) => x + y);
const multiply = curry((x, y) => x * y);
const divide = curry((x, y) => x / y);
const squared = (x) => x ** 2; // Math.pow(x, 2) || multiply(x, x)
const doubled = (x) => multiply(x, 2);

const diameterToRadius = (d) => divide(d, 2);
const circleArea = (r) => multiply(PI(), squared(r));
const circleCircumference = (d) => multiply(PI(), d);

const to2Dec = (x) => +x.toFixed(2);

const circleAreas = (d) => doubled(
  circleArea(
    diameterToRadius(d)
  )
);

const rectangleArea = multiply; // ALIAS

const calculateCylinderSurfaceFunctional = (height, diameter) =>
  to2Dec(
    sum(
      circleAreas(diameter),
      rectangleArea(
        circleCircumference(diameter),
        height
      )
    )
  );

const runTests = () => {
  console.time('CylinderSurfaceArea::Functional');
  expect(calculateCylinderSurfaceFunctional(10, 20)).toEqual(1256.64) // ~ 1256.64 square units
  console.timeEnd('CylinderSurfaceArea::Functional');
};

module.exports = {
  runTests,
  calculateCylinderSurfaceFunctional
};
