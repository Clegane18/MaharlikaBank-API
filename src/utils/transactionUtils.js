const TransactionHistory = require('../database/transactionHistoryModel');
const generateTransactionReference = (customerId) => {
    const timestamp = Date.now();
    const randomPart = generateRandomAlphanumericString(6); 

    const reference = `${customerId}-${timestamp}-${randomPart}`;

    return reference;
};

const generateRandomAlphanumericString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
};

const generateTransactionReceipt = (transaction) => {
    const transactionReceipt = {
        customerId: transaction.customerId,
        transactionType: transaction.transactionType,
        transactionAmount: transaction.transactionAmount,
        description: transaction.description,
        transactionReference: transaction.transactionReference,
        timeStamp: transaction.timeStamp,
    };

    return transactionReceipt;

};

const createTransactionHistory = async ({ customerId, transactionType, transactionAmount, transactionStatus, description }) => {
    try {
        const transactionReference = generateTransactionReference(customerId);
        const transaction = await TransactionHistory.create({
            customerId: customerId,
            transactionType: transactionType,
            transactionAmount: transactionAmount,
            transactionStatus: transactionStatus,
            description: description,
            transactionReference: transactionReference,
            timeStamp: new Date(), 
        });
        return transaction;
    } catch (error) {
        console.error('Error creating transaction history:', error);
        throw error;
    }
};

module.exports = { generateTransactionReference, generateRandomAlphanumericString, generateTransactionReceipt, createTransactionHistory };