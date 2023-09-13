const express = require ('express');
const router = express.Router();
const errHandler = require('../middlewares/errHandler');
const transactionHistoryController = require('../controllers/transactionHistoryController');
const { authenticateToken } = require('../middlewares/jwtMiddleware');

router.use(errHandler);

router.get('/transactionHistories', authenticateToken, transactionHistoryController.getAllTransactionHistories);
router.get('/transactionHistories/by-date', authenticateToken, transactionHistoryController.getTransactionHistoryByDate);
router.get('/transactionHistories/by-type', authenticateToken, transactionHistoryController.getTransactionHistoryByType);
router.get('/transactionHistories/transactionId/:transactionId', authenticateToken, transactionHistoryController.getTransactionHistoryById);
router.get('/transactionHistories/customerId/:customerId', authenticateToken, transactionHistoryController.getTransactionHistoryByCustomerId);

module.exports = router;