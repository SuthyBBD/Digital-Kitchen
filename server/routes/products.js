const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware, function (req, res) {
  res.json({"secret": true});
});

router.get('', function (req, res) {
  Product.find({})
    .select('-purchases')
    .exec(function (err, foundProducts) {
      res.json(foundProducts);
    });
});

router.get('/:id', function (req, res) {
  const productId = req.params.id;

  Product.findById(productId)
    .populate('user', 'username -_id')
    .populate('purchases', 'quantity -_id')
    .exec(function (err, foundProduct) {
      if (err) {
        res.status(422).send({errors: [{title: 'Error', detail: 'product does not exist'}]});
      }
      res.json(foundProduct);
    });
});

module.exports = router;
