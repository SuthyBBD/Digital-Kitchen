const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./config/dev'),
  Product = require('./model/product'),
  MockDb = require('./mock-db');

const productRoutes = require('./routes/products'),
  userRoutes = require('./routes/users'),
  purchaseRoutes = require('./routes/purchases');

mongoose.connect(config.DB_URI).then(() => {
  const mockDb = new MockDb();
  mockDb.seedDb();
}).catch((error) => {
  console.log(error.message);
});

const app = express();

app.use(bodyParser.json());


app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/purchases', purchaseRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("I am running");
});
