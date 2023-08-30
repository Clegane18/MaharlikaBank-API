const transactionsService = require ('../services/transactionService');
const transactionsControllerErrorHandler = require ('../middlewares/transactionsControllerErrorHandler');

const deposit = async (req, res) => {
    try{
        const result = await transactionsService.deposit({
            customerId: parseInt(req.params.id),
            depositAmount: parseFloat(req.body.depositAmount),
        });

        return res.status(result.status).json(result);
    } catch(error){
        return transactionsControllerErrorHandler(res, error, 'Error in depositing');
    };
};

const withdraw = async (req, res) => {
    try{
        const result = await transactionsService.withdraw({
            customerId: parseInt(req.params.id),
            withdrawAmount: parseFloat(req.body.withdrawAmount),
        });

        return res.status(result.status).json(result);
    } catch(error){
        return transactionsControllerErrorHandler(res, error, 'Error in withdrawing');
    };
};

const checkBalance = async (req, res) => {
    try{
        const result = await transactionsService.checkBalance({ customerId: parseInt(req.params.id)});

        return res.status(result.status).json(result);
    } catch(error){   
        return transactionsControllerErrorHandler(res, error, 'Error in retrieving account balance');     
    }
};

module.exports = { deposit, withdraw, checkBalance };
