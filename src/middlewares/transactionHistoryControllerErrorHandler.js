const transactionHistoryControllerErrorHandler = (res, error, defaultMessage) => {
    console.error('Error in customer controller:', error);

    let statusCode = 500;
    let message = defaultMessage || 'An error occurred while processing your request';

    if (error.status && error.data && error.data.message) {
        statusCode = error.status;
        message = error.data.message;
    }  else if (error.message){
        message = error.message;
    }


    return res.status(statusCode).json({ error: message });
};

module.exports = transactionHistoryControllerErrorHandler;
