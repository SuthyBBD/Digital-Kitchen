const express = require('express');
const Product = require('../model/product');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware, function(req, res) {
  res.json({"secret": true});
});

router.get('', function (req, res) {
  Product.find({}, function (err, products) {

    res.json(products);
  });
});

router.get('/:id', function(req, res) {
  const productId = req.params.id;

  Product.findById(productId, function(err, product) {
    if(err) {
      res.status(422).send({errors: [{title: 'Error', detail: 'product does not exist'}]});
    }

    res.json(product);
  });
});

module.exports = router;
