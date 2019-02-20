const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Product = require('./model/product');
const MockDb = require('./mock-db');
const productRoutes = require('./routes/products')

mongoose.connect(config.DB_URI).then(() => {
  const mockDb = new MockDb();
  mockDb.seedDb();
});

const app = express();

app.use('/api/v1/products', productRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("I am running");
});
