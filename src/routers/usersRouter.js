const express = require ('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const { createAccountValidation, updateAccountValidation } = require('../middlewares/validators');
const customerController = require('../controllers/customerController');
const errorHandler = require('../middlewares/errHandler');




router.use(errorHandler);

router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.put('/customers/:id', upload.single('profilePicture'), updateAccountValidation, customerController.updateCustomerById);
router.delete('/customers/:id', customerController.deleteCustomerById);
router.post('/signin', upload.single('profilePicture'), createAccountValidation, customerController.signIn);
router.post('/login', customerController.logIn);

module.exports = router;