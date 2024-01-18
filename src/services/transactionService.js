const Customer = require('../database/customerModel');
const { generateTransactionReceipt, createTransactionHistory } = require('../utils/transaction.utils');


const deposit = async ({ customerId, depositAmount }) => {
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw{
                status: 404,
                data: { message: `Customer not found with ID: ${customerId}` },
            };    
        };

        if(depositAmount <=0 || isNaN(depositAmount)){
            await createTransactionHistory({
                customerId,
                transactionType: 'Deposit',
                transactionAmount: depositAmount,
                transactionStatus: 'Failed',
                description: 
                    depositAmount <= 0
                    ? 'Deposit amount must be greater than zero.'
                    : 'Deposit amount must be a number.',
            });

            throw {
                status: 400,
                data: {
                    message: 
                        depositAmount <= 0
                            ? 'Invalid input: Deposit amount must be greater than zero.'
                            : 'Invalid input: Please provide a valid number for deposit.'
                },
            };  
        };

        const transaction = await createTransactionHistory({
            customerId: customer.id,
            transactionType: 'Deposit',
            transactionAmount: depositAmount,
            transactionStatus: 'Success',
            description: 'Deposit transaction',
        });

        customer.currentBalance += depositAmount;
        await customer.save();

        const transactionReceipt = generateTransactionReceipt(transaction);

        return{
            status: 200,
            data: {
                message: `Deposit successful. The updated balance is ${customer.currentBalance.toLocaleString()}`,
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

        if(withdrawAmount <= 0 || isNaN(withdrawAmount)){
            await createTransactionHistory({
                customerId,
                transactionType: 'Withdraw',
                transactionAmount: withdrawAmount,
                transactionStatus: 'Failed',
                description:
                    withdrawAmount <= 0
                        ? 'Withdrawal amount must be greater than zero'
                        : 'Withdrawal amount must be a number',
            });

            throw {
                status: 400,
                data: {
                    message:
                        withdrawAmount <= 0
                            ? 'Invalid input: Withdrawal amount must be greater than zero'
                            : 'Invalid input: Please provide a valid number for withdrawal',
                },
            };
        };

        if(withdrawAmount > customer.currentBalance){
            await createTransactionHistory({
                customerId,
                transactionType: 'Withdraw',
                transactionAmount: withdrawAmount,
                transactionStatus: 'Failed',
                description: 'Failed: Insufficient funds',
            });

            throw {
                status: 400,
                data: { message: 'Insufficient funds for withdrawal' },
            };
        }; 

        const transaction = await createTransactionHistory({
            customerId: customer.id,
            transactionType: 'Withdraw',
            transactionAmount: withdrawAmount,
            transactionStatus: 'Success',
            description: 'Withdraw transaction',
        });

        customer.currentBalance -= withdrawAmount;
        await customer.save();

        const transactionReceipt = generateTransactionReceipt(transaction);

        return{
            status: 200,
            data: {
                message: `Withdrawal successful. The update balance is ${customer.currentBalance.toLocaleString()}`,
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

        const transaction = await createTransactionHistory({
            customerId: customer.id,
            transactionType: 'Check Balance',
            transactionAmount: 0,
            transactionStatus: 'Success',
            description: 'Balance inquiry',
        });

        const transactionReceipt = generateTransactionReceipt(transaction);

        return{
            status: 200,
            data: {
                message: `Your current balance is: ${customer.currentBalance.toLocaleString()}`,
                TransactionReceipt: transactionReceipt,
            },
        };

    } catch(error){
        console.error('Error in checkBalance service:', error);
        throw error;
    };
};

module.exports = { deposit, withdraw, checkBalance };