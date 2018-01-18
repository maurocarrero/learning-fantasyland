const faker = require('faker');

/**
 * REDUCING
 */
const randomNum = (top) => () => Math.round(Math.random() * top + 1);

// TODO: take a look at below implementation of getArrayOf <3
// const getArrayOf = (qty, f) => {
//   let arr = new Array(qty);
//   for (let i = 0; i < qty; i++) {
//     arr[ i ] = f();
//   }
//   return arr;
// }

const getArrayOf = (qty, f) => [ ...Array(qty) ].map(f);

const randomNumbersArray = (qty, top) => getArrayOf(qty, randomNum(top));

const randomNumbersArrayWithNulls = (qty, top) => {
  const arr = randomNumbersArray(qty, top);
  arr[ randomNum(qty)() - 1 ] = null;
  arr[ randomNum(qty)() - 1 ] = null;
  return arr;
};

const getStudent = _ => ({
  name: faker.name.firstName(),
  grades: randomNumbersArrayWithNulls(10, 100)
});

const getStudents = (qty) => getArrayOf(qty, getStudent);

module.exports = getStudents;