const express = require ('express');
const router = express.Router();
const errHandler = require('../middlewares/errHandler');
const transactionHistoryController = require('../controllers/transactionHistoryController');
const checkAuthorization = require('../middlewares/authorizationMiddleware');

router.use(errHandler);

router.get('/transactionHistories', transactionHistoryController.getAllTransactionHistories);
router.get('/transactionHistories/by-date', transactionHistoryController.getTransactionHistoryByDate);
router.get('/transactionHistories/by-type', transactionHistoryController.getTransactionHistoryByType);
router.get('/transactionHistories/transactionId/:transactionId', transactionHistoryController.getTransactionHistoryById);
router.get('/transactionHistories/customerId/:customerId', transactionHistoryController.getTransactionHistoryByCustomerId);

module.exports = router;