const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./config/dev'),
  Product = require('./model/product'),
  MockDb = require('./mock-db');

  const productRoutes = require('./routes/products'),
  userRoutes = require('./routes/users');

mongoose.connect(config.DB_URI).then(() => {
  const mockDb = new MockDb();
  mockDb.seedDb();
});

const app = express();

app.use(bodyParser.json());


app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("I am running");
});
