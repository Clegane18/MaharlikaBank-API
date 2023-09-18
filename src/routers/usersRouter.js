const express = require ('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const { createAccountValidation, updateAccountValidation } = require('../middlewares/validators');
const customerController = require('../controllers/customerController');
const errorHandler = require('../middlewares/errHandler');
const { authenticateToken } = require('../middlewares/jwtMiddleware');
const checkAuthorization = require('../middlewares/authorizationMiddleware');


router.use(errorHandler);

router.get('/customers', authenticateToken, customerController.getAllCustomers);
router.get('/customers/:id', authenticateToken, checkAuthorization, customerController.getCustomerById);
router.put('/customers/:id', authenticateToken, checkAuthorization, upload.single('profilePicture'), updateAccountValidation, customerController.updateCustomerById);
router.delete('/customers/:id',authenticateToken, checkAuthorization, customerController.deleteCustomerById);
router.post('/signin', upload.single('profilePicture'), createAccountValidation, customerController.signIn);
router.post('/login', customerController.logIn);
router.get('/totalBalance', authenticateToken, customerController.calculatesAllTotalBalance);

module.exports = router;