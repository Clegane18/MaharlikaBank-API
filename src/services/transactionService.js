const Customer = require('../database/customerModel');


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
            throw{
                status: 400,
                data: { message: 'Invalid input: Deposit amount must be greater than zero' },
            };
        }; 

        if(isNaN(depositAmount)){
            throw{
                status: 400,
                data: { message: 'Invalid input: Please provide a valid number for deposit' },
            };
        };

        customer.currentBalance += depositAmount;
        await customer.save();

        return{
            status: 200,
            data: { message: `Deposit successful. The updated balance is ${customer.currentBalance}` },
        };
    } catch (error){
        console.error('Error in deposit service', error);
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
            throw{
                status: 400,
                data: { message: 'Invalid input: Withdrawal amount must be greater than zero' },
            };
        }; 

        if(withdrawAmount > customer.currentBalance){
            throw{
                status: 400,
                data: { message: 'Insufficient funds for withdrawal' }, 
            };
        };

        if(isNaN(withdrawAmount)){
            throw{
                status: 400,
                data: { message: 'Invalid input: Please provide a valid number for withdrawal' },
            };
        };

        customer.currentBalance -= withdrawAmount;
        await customer.save();

        return{
            status: 200,
            data: { message: `Withdrawal successful. The update balance is ${customer.currentBalance}` },
        };

    } catch(error){
        console.error('Error in withdrawal service', error);
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

        return{
            status: 200,
            data: { message: `Your current balance is: ${customer.currentBalance}` },
        };

    } catch(error){
        console.error('Error in checkBalance service', error);
        throw error;
    };
};
module.exports = { deposit, withdraw, checkBalance };