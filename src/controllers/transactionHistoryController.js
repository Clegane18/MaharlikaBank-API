const transactionHistoryService = require('../services/transactionHistoryService');
const transactionHistoryControllerErrorHandler = require('../middlewares/transactionHistoryControllerErrorHandler');

const getAllTransactionHistories = async (req, res) => {
    try{
        const result = await transactionHistoryService.getAllTransactionHistories();
        return res.status(result.status).json(result.data);
    } catch (error) {
        return transactionHistoryControllerErrorHandler(res, error, 'Error fetching all transaction histories');
    };    
};

const getTransactionHistoryByDate = async (req, res) => {
    try{
        const result = await transactionHistoryService.getTransactionHistoryByDate({
            start_date: req.query.start_date, 
            end_date: req.query.end_date,
        });
        return res.status(result.status).json(result.data);
    } catch (error) {
        return transactionHistoryControllerErrorHandler(res, error, 'Error fetching transaction histories by date');
    };    
};

const getTransactionHistoryByType = async (req, res) => {
    try{
        const result = await transactionHistoryService.getTransactionHistoryByType({ transactionType: req.query.transactionType });
        return res.status(result.status).json(result.data);
    } catch (error) {
        return transactionHistoryControllerErrorHandler(res, error, 'Error fetching transaction histories by type');
    };
};

const getTransactionHistoryById = async (req, res) => {
    try{
        const result = await transactionHistoryService.getTransactionHistoryById({ transactionId: req.params.transactionId });
        return res.status(result.status).json(result.data);
    } catch (error) {
        return transactionHistoryControllerErrorHandler(res, error, 'Error fetching transaction histories by ID');
    };
};

const getTransactionHistoryByCustomerId = async (req, res) => {
    try{
        const result = await transactionHistoryService.getTransactionHistoryByCustomerId({ customerId: req.params.customerId });
        return res.status(result.status).json(result.data);
    } catch (error) {
        return transactionHistoryControllerErrorHandler(res, error, 'Error fetching transaction histories by Customer\'s ID');    
    };
};



module.exports = { getAllTransactionHistories, getTransactionHistoryByDate, getTransactionHistoryByType, getTransactionHistoryById, getTransactionHistoryByCustomerId };