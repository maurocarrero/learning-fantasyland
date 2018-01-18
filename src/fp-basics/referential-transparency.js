const expect = require('expect');
const document = require('../utils/dom');

/**
 * GET DIMENSIONS (IMPURE)
 * This function uses directly the impure non-deterministic "document.querySelector" function,
 * hence it is itself impure since it will always return an array with two unknown values.
 */
const impureGetDimensions = (diamSelector, heightSelector) => {
  const diameter = document.querySelector(diamSelector).value;
  const height = document.querySelector(heightSelector).value;

  if (!diameter || !height) {
    return null;
  }

  return [ diameter, height ];
};

expect(impureGetDimensions('diameter', 'height')).not.toEqual('We never know...');

/**
 * GET DIMENSIONS (PURE)
 * This version of getDimensions is pure, since it receives the same arguments, nevertheless now it
 * will delegate its work to an inner impure function, hence it remains itself pure, it will always return
 * a new function (impure) that will have in its scope, the arguments of the parent function.
 */
const pureGetDimensions = (diamSelector, heightSelector) =>
  () => {
    const diameter = document.querySelector(diamSelector).value;
    const height = document.querySelector(heightSelector).value;

    if (!diameter || !height) {
      return null;
    }

    return [ diameter, height ];
  };

expect(typeof pureGetDimensions('diameter', 'height')).toEqual('function');

/**
 * FINAL THOUGHTS:
 * A pure function cannot run an impure function and remain pure; but it can setup the context in which that
 * impure function will work and return a new function that will use the impure function, remaining itself pure.
 **/
