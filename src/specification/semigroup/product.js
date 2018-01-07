const expect = require('expect');
const { tagged } = require('daggy');

// Product
const Product = tagged('Product', [ 'val' ]);

// concat :: Product a => a ~> a -> a
Product.prototype.concat = function (other) {
  return Product(this.val * other.val);
};

// Empty method, check monoids.
Product.empty = () => Product(1);

expect(
  Product(2).concat(Product(4)).concat(Product(8))
).toEqual(Product(64));
expect(
  Product(2).concat(Product(4)).concat(Product(8))
).toEqual(
  Product(2).concat(Product(4).concat(Product(8)))
);

module.exports = Product;