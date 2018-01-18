// const faker = require('faker');

const document = {
  querySelector: () => ({
    value: Math.round(Math.random() * 100) + 1 // Faking the returned value as a number between 1 and 100
  })
};

module.exports = document;
