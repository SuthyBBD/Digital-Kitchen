const Product = require('./model/product')
const User = require('./model/user');

class MockDb {

  constructor() {
    this.products = [{
      brand: 'BuyFresh',
      name: 'Dijon Mustard',
      description: 'Mustardy Mustard',
      retailPrice: '250',
      dkPrice: '180',
      image: 'blahblah',
      createdDate: '',
      active: true,
      stockCount: 6
    },
      {
        brand: 'PizzaCo',
        name: 'Pizza',
        description: 'Pizzary Pizza',
        retailPrice: '120',
        dkPrice: '50',
        image: 'blahblah',
        createdDate: '',
        active: true,
        stockCount: 6
      },
      {
        brand: 'Fudy',
        name: 'Fud',
        description: 'Fudily Fud',
        retailPrice: '250',
        dkPrice: '180',
        image: 'blahblah',
        createdDate: '',
        active: true,
        stockCount: 6
      },
      {
        brand: 'Rozos Hot Dogs',
        name: 'Hot Dog',
        description: 'Hottily Dog',
        retailPrice: '250',
        dkPrice: '180',
        image: 'blahblah',
        createdDate: '',
        active: true,
        stockCount: 6
      }];


    this.users = [{
      username: 'Test User',
      email: 'test@gmail.com',
      password: 'testtest'
    }];
  }

  async cleanDB() {
    await User.deleteMany({});
    await Product.deleteMany({});
  }

  saveDataToDB() {
    const user = new User(this.users[0]);

    this.products.forEach((p) => {
      const newProduct = new Product(p);
      newProduct.user = user;
      user.products.push(newProduct);
      newProduct.save();
    });

    user.save();
  }

  async seedDb() {
   await this.cleanDB();
    this.saveDataToDB();
  }
}

module.exports = MockDb;
