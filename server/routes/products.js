const express = require('express');
const router = express.Router();
const Product = require('../model/product');

router.get('', function (req, res) {
  Product.find({}, function (err, products) {

    res.json(products);
  });
});

router.get('/:id', function(req, res) {
  const productId = req.params.id;

  Product.findById(productId, function(err, product) {
    if(err) {
      res.status(422).send({errors: [{title: 'Error', detail: 'Product does not exist'}]});
    }

    res.json(product);
  });
});

module.exports = router;
