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

module.exports = { generateTransactionReference, generateRandomAlphanumericString, generateTransactionReceipt };