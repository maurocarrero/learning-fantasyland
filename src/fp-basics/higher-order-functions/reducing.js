const expect = require('expect');
const { curry } = require('ramda');
const { divide, subtract, sum } = require('../../utils/math');
const students = require('../../utils/students.json');

// Simple REDUCE
expect(
  [ 1, 2, 3, 4, 5 ].reduce((acc, x) => {
    return acc + x;
  }, 0)
).toEqual(15);

// Implementing a reduce function
const reduce = (reducer, initial, list) => {
  let acc = initial;
  list.forEach(x => {
    acc = reducer(acc, x);
  });
  return acc;
};

/************************************************************************/

const curriedReduce = curry(reduce);
const getTotal = curriedReduce(sum, 0);
const sortAsc = (list) => list.sort(subtract);
const map = curry((f, list) => list.map(f));
const filter = curry((g, list) => list.filter(g));
const dropLowest = (list) => sortAsc(list);
const clean = (x) => x > 0;
const sumAll = curriedReduce(sum, 0);
const getAvg = (list) => divide(sumAll(list), list.length);

const studentsStats = (student) => {
  const { grades, name } = student;
  const highestGrades = sortAsc(dropLowest(filter(clean, grades)));
  const avg = getAvg(grades);
  const top = Math.max(...grades);
  return {
    avg,
    highestGrades,
    name,
    top
  };
};

const bestStats = (acc, { name, avg, top }) => [
  avg > acc[ 0 ].avg ? { name, avg } : acc[ 0 ],
  top > acc[ 1 ].top ? { name, top } : acc[ 1 ],
];

const getBest = (students) =>
  curriedReduce(bestStats, [ { avg: -Infinity }, { top: -Infinity } ], students);

const bestResults = getBest(map(studentsStats, students));

const runTests = () => {
  expect(reduce(sum, 0, [ 1, 2, 3, 4, 5 ])).toEqual(15);
  expect(getTotal([ 1, 2, 3, 4, 5 ])).toEqual(15);
  expect(dropLowest([ 10, 23, 31, 4, 115 ])).toEqual([ 4, 10, 23, 31, 115 ]);
  expect(bestResults).toEqual([ {
    avg: 53.5,
    name: 'Trycia'
  }, {
    name: 'Christy',
    top: 100
  } ]);
};

module.exports = {
  runTests
};
