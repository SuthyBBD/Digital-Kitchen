const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const PurchaseCtrl = require('../controllers/purchase');

router.post('', UserCtrl.authMiddleware, PurchaseCtrl.createPurchase);

//router.get('/manage', UserCtrl.authMiddleware, PurchaseCtrl.getUserPurchases());

module.exports = router;


