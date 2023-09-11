const Customer = require('../database/customerModel');
const TransactionHistory = require('../database/transactionHistoryModel');
const { generateTransactionReference, generateTransactionReceipt } = require('../utils/transactionUtils');


const deposit = async ({ customerId, depositAmount }) => {
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw{
                status: 404,
                data: { message: `Customer not found with ID: ${customerId}` },
            };    
        };

        if(depositAmount <= 0){
            await TransactionHistory.create({
                customerId,
                transactionType: 'Deposit',
                transactionAmount: depositAmount,
                transactionStatus: 'Failed',
                description: 'Deposit amount must be greater than zero',
                transactionReference: generateTransactionReference(customerId),
                timeStamp: new Date(),
            });

            throw{
                status: 400,
                data: { message: 'Invalid input: Deposit amount must be greater than zero' },
            };
        }; 

        if(isNaN(depositAmount)){
            await TransactionHistory.create({
                customerId,
                transactionType: 'Deposit',
                transactionAmount: depositAmount,
                transactionStatus: 'Failed',
                description: 'Deposit amount must be  number',
                transactionReference: generateTransactionReference(customerId),
                timeStamp: new Date(),
            });

            throw{
                status: 400,
                data: { message: 'Invalid input: Please provide a valid number for deposit' },
            };
        };

        const transactionReference = generateTransactionReference(customerId);

        const transaction = await TransactionHistory.create({
            customerId: customer.id,
            transactionType: 'Deposit',
            transactionAmount: depositAmount,
            transactionStatus: 'Success',
            description: 'Deposit transaction',
            transactionReference: transactionReference,
            timeStamp: new Date(),
        });

        customer.currentBalance += depositAmount;
        await customer.save();

        const transactionReceipt = generateTransactionReceipt(transaction);

        return{
            status: 200,
            data: {
                message: `Deposit successful. The updated balance is ${customer.currentBalance}`,
                TransactionReceipt: transactionReceipt,
            },
        };

    } catch (error){
        console.error('Error in deposit service:', error);
        throw error;
    };
};

const withdraw = async ({ customerId, withdrawAmount }) => {
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw {
                status: 404,
                data: { message: `Customer not found with ID ${customerId}` },
            };    
        };

        if(withdrawAmount <= 0){
            await TransactionHistory.create({
                customerId,
                transactionType: 'Withdraw',
                transactionAmount: withdrawAmount,
                transactionStatus: 'Failed',
                description: 'Withdrawal amount must be greater than zero',
                transactionReference: generateTransactionReference(customerId),
                timeStamp: new Date(),
            });
            
            throw{
                status: 400,
                data: { message: 'Invalid input: Withdrawal amount must be greater than zero' },
            };
        }; 

        if(withdrawAmount > customer.currentBalance){
            await TransactionHistory.create({
                customerId,
                transactionType: 'Withdraw',
                transactionAmount: withdrawAmount,
                transactionStatus: 'Failed',
                description: 'Failed: Insufficient funds',
                transactionReference: generateTransactionReference(customerId),
                timeStamp: new Date(),
            });

            throw{
                status: 400,
                data: { message: 'Insufficient funds for withdrawal' }, 
            };
        };

        if(isNaN(withdrawAmount)){
            await TransactionHistory.create({
                customerId,
                transactionType: 'Withdraw',
                transactionAmount: withdrawAmount,
                transactionStatus: 'Failed',
                description: 'Withdrawal amount must be a number',
                transactionReference: generateTransactionReference(customerId),
                timeStamp: new Date(),
            });

            throw{
                status: 400,
                data: { message: 'Invalid input: Please provide a valid number for withdrawal' },
            };
        };

        const transactionReference = generateTransactionReference(customerId);

        const transaction = await TransactionHistory.create({
            customerId: customer.id,
            transactionType: 'Withdraw',
            transactionAmount: withdrawAmount,
            transactionStatus: 'Success',
            description: 'Withdraw transaction',
            transactionReference: transactionReference,
            timeStamp: new Date(),
        });

        customer.currentBalance -= withdrawAmount;
        await customer.save();

        const transactionReceipt = generateTransactionReceipt(transaction);

        return{
            status: 200,
            data: {
                message: `Withdrawal successful. The update balance is ${customer.currentBalance}`,
                TransactionReceipt: transactionReceipt,
            },
        };

    } catch(error){
        console.error('Error in withdrawal service:', error);
        throw error;
    };
};

const checkBalance = async ({ customerId }) =>{
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw{
                status: 404,
                data: { message: `Customer not found with ID: ${customerId}` },
            };
        };

        const transactionReference = generateTransactionReference(customerId);

        const transaction = await TransactionHistory.create({
            customerId: customer.id,
            transactionType: 'Check Balance',
            transactionAmount: 0,
            transactionStatus: 'Success',
            description: 'Balance inquiry',
            transactionReference: transactionReference,
            timeStamp: new Date(),
        });

        const transactionReceipt = generateTransactionReceipt(transaction);

        return{
            status: 200,
            data: {
                message: `Your current balance is: ${customer.currentBalance}`,
                TransactionReceipt: transactionReceipt,
            },
        };

    } catch(error){
        console.error('Error in checkBalance service:', error);
        throw error;
    };
};

module.exports = { deposit, withdraw, checkBalance };