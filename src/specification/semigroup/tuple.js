// http://www.tomharding.me/2017/03/13/fantas-eel-and-specification-4/

const expect = require('expect');
const { tagged } = require('daggy');
const Sum = require('./sum');
const Min = require('./min');
const Any = require('./any');
const First = require('./first');
const List = require('../daggy/List');
const { curry } = require('ramda');

const Tuple = tagged('Tuple', [ 'a', 'b' ]);

// concat :: (Semigroup a, Semigroup b) => Tuple a b ~> Tuple a b -> Tuple a b
Tuple.prototype.concat = function (other) {
  return Tuple(
    this.a.concat(other.a),
    this.b.concat(other.b)
  );
};

expect(
  Tuple(Sum(3), Any(false)).concat(Tuple(Sum(7), Any(true)))
).toEqual(
  Tuple(Sum(10), Any(true))
);

const Tuple4 = tagged('Tuple4', [ 'a', 'b', 'c', 'd' ]);
// concat :: (Semigroup a, Semigroup b, Semigroup c, Semigroup c) =>
//            Tuple4 a b c d ~> Tuple3 a b c d -> Tuple3 a b c d
Tuple4.prototype.concat = function (other) {
  return Tuple4(
    this.a.concat(other.a),
    this.b.concat(other.b),
    this.c.concat(other.c),
    this.d.concat(other.d)
  );
};


const Customer = tagged('Customer', [
  'name',
  'favouriteThings',
  'registrationDate',
  'hasMadePurchase'
]);

Customer.prototype.concat = function (that) {
  return Customer(
    this.name,
    // A `Set` type would be good here.
    this.favouriteThings.concat(that.favouriteThings),
    Min(this.registrationDate).concat(that.registrationDate),
    Any(this.hasMadePurchase).concat(Any(that.hasMadePurchase))
  )
}

// Using a Strategy ---> Tuple4

const myStrategy = {
  // to :: Customer
  //    -> Tuple4 (First String)
  //              [String]
  //              (Min Int)
  //              (Any Bool)
  to: (customer) => {
    return Tuple4(
      First(customer.name),
      customer.favouriteThings,
      Min(customer.registrationDate),
      Any(customer.hasMadePurchase)
    );
  },

  // from :: Tuple4 (First String)
  //                [String]
  //                (Min Int)
  //                (Any Bool)
  //      -> Customer
  from: ({ a, b, c, d }) => {
    return Customer(a.val, b, c.val, d.val)
  }
};

// merge :: Semigroup m =>
//        { to    :: a -> m,
//          from  :: m -> a  }
//        -> a -> a -> a
const merge = curry((strategy, x, y) =>
  strategy.from(
    strategy.to(x)
      .concat(
        strategy.to(y)
      )
  ));

const c1 = Customer('Pepe', [ 'nadar', 'correr' ], new Date(123123123), false);
const c2 = Customer('Toto', [ 'tomar agua', 'jugar' ], new Date(), true);

expect(
  merge(myStrategy)(c1)(c2).toString()
).toEqual('Customer("Pepe", ["nadar", "correr", "tomar agua", "jugar"], new Date("1970-01-02T10:12:03.123Z"), true)');


const mergeMany = (strategy) =>
  (initial) => (customers) =>
    customers.reduce(merge(strategy), initial);

const c3 = Customer('Peteco', [ 'pool', 'ping-pong' ], new Date(123123123), false);
const c4 = Customer('Almibar', [ 'be a hipster', 'dance' ], new Date(), false);

Customer.empty = () =>
  Customer('Initial', [], new Date(), false);

const customers = [ c1, c2, c3, c4 ];

expect(mergeMany(myStrategy)(Customer.empty())(customers).toString())
  .toEqual('Customer("Initial", ["nadar", "correr", "tomar agua", "jugar", "pool", "ping-pong", "be a hipster", ' +
    '"dance"], new Date("1970-01-02T10:12:03.123Z"), true)');

