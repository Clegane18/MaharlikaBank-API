const express = require ('express');
const router = express.Router();
const errHandler = require('../middlewares/errHandler');
const transactionController = require ('../controllers/transactionsController');
const { authenticateToken } = require ('../middlewares/jwtMiddleware');
const checkAuthorization = require ('../middlewares/authorizationMiddleware');

router.use(errHandler);

router.post('/transactions/deposit/:id', authenticateToken, checkAuthorization, transactionController.deposit);
router.post('/transactions/withdraw/:id', authenticateToken, checkAuthorization, transactionController.withdraw);
router.post('/transactions/checkBalance/:id', authenticateToken, checkAuthorization, transactionController.checkBalance);

module.exports = router;