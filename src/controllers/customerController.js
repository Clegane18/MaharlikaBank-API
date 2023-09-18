const customerService = require ('../services/customerService');
const customerControllerErrorHandler = require ('../middlewares/customerControllerErrorHandler');

const getAllCustomers = async (req, res) => {
    try{
        const result = await customerService.getAllCustomers();
        return res.status(result.status).json(result.data);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error fetching all customers');
    };
};

const getCustomerById = async (req, res) => {
    try{
        const result = await customerService.getCustomerById({ customerId: req.params.id });
        return res.status(result.status).json(result.data);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error fetching customer by id');
    }    
};

const updateCustomerById = async (req, res) => {
    try{
        const result = await customerService.updateCustomerById({
            customerId: req.params.id,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.file
    });
        return res.status(result.status).json(result);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error updating customer data');
    };
};

const deleteCustomerById = async (req, res) => {
    try{
        const result = await customerService.deleteCustomerById({ customerId: req.params.id });
        return res.status(result.status).json(result);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error deliting customer by id');
    };
};

const signIn = async (req, res) => {
    try{
        const result = await customerService.signIn({
            email: req.body.email,
            password: req.body.password,
            currentBalance: req.body.currentBalance,
            profilePicture: req.file
    });
        return res.status(result.status).json(result);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error creating customer');
    };
};  

const logIn = async (req, res) => {
    try{
        const result = await customerService.logIn({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(result.status).json(result);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error in logging in');
    };
};

const calculatesAllTotalBalance = async (req, res) => {
    try{
        const result = await customerService.calculatesAllTotalBalance();
        return res.status(result.status).json(result);
    } catch (error) {
        return customerControllerErrorHandler(res, error, 'Error in calculating all total balance of customer.');
    }
};

module.exports = { getAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById, signIn, logIn, calculatesAllTotalBalance};