const Product = require('./model/product')

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
      }]
  }

  async cleanProducts() {
    await Product.deleteMany({});
  }

  saveProducts() {
    this.products.forEach((product) => {
      const newProduct = new Product(product);
    newProduct.save();

  });
  }

  seedDb() {
    this.cleanProducts();
    this.saveProducts();
  }
}
module.exports = MockDb;
