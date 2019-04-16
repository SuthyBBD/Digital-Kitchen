const Purchase = require('../model/purchase');
const Product = require('../model/product');
const User = require('../model/user');
const {normalizeErrors} = require('../helpers/mongoose');

exports.createPurchase = function (req, res) {
  const {createdAt, product, quantity} = req.body;
  const user = res.locals.user;

  const purchase = new Purchase({createdAt, product, quantity});


  Product.findById(product._id)
    .populate('purchases')
    .populate('user')
    .exec(async function (err, foundProduct) {
      if (err) {
        console.log(err)
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundProduct.user.id === user.id) {
        return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'Cannot purchase your own product'}]});
      }

      if (isValidPurchase(purchase, foundProduct)) {
        purchase.user = user;
        purchase.product = foundProduct;
        foundProduct.purchases.push(purchase);

        purchase.save(function (err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }

          foundProduct.save();
          User.updateOne({_id: user.id}, {$push: {purchases: purchase}}, function(){});
        })

        res.json({'createdPurchase': true});
      } else {
        return res.status(422).send({
          errors: [{title: 'Invalid purchase!', detail: 'quantity exceeds number of product available'}]
        });
      }
    });
}

function isValidPurchase(proposedPurchase, product) {
  let isValid = true;

  if (product.quantity && product.quantity.length > 0) {
    product.quantity.every(function (purchase) {
      const proposedQuantity = Number(proposedPurchase.quantity);
      const actualQuantity = Number(purchase.quantity);

      if ((proposedQuantity < actualQuantity)) {
        return true;
      } else {
        return false;
      }
    })
  }
  return isValid;
}
