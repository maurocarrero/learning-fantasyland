const { curry } = require('ramda');

const sum = curry((x, y) => x + y);
const multiply = curry((x, y) => x * y);
const subtract = curry((x, y) => x - y);
const divide = curry((x, y) => x / y);

module.exports = {
  sum,
  multiply,
  subtract,
  divide
};
