const TransactionHistory = require('../database/transactionHistoryModel');
const { Op } = require('sequelize');

const getAllTransactionHistories = async () => {
    try{
        const transactionHistories = await TransactionHistory.findAll({
            order: [['transactionId', 'ASC']],
        });

        return{
            status: 200,
            data: transactionHistories,
        }

    } catch (error){
        console.error('Error retrieving all transaction histories:', error);
        throw error;
    }
};

const getTransactionHistoryByDate = async ({ start_date, end_date }) => {
    try{
        if (!start_date || !end_date) {
            
            throw{
                status: 400,
                data: { messsage: 'Error: Both start_date and end_date are required.' },
            };
        }; 
        
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        endDate.setHours(23, 59, 59, 999);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw {
                status: 400,
                data: { message: 'Error: Invalid date format for start_date or end_date.' },
            };
        }

        const transactions = await TransactionHistory.findAll({
            where: {
                timeStamp: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        return{
            status: 200,
            data: transactions,
        };

    } catch (error){
        console.error('Error retrieving transaction history by date: ', error);
        throw error;
    }
};

const getTransactionHistoryByType = async ({ transactionType }) => {
    try{
        const transactionHistory = await TransactionHistory.findAll({ where: { transactionType: transactionType } });

        if(!transactionHistory){
            throw{
                status: 404,
                data: { message: `Cannot find transaction type: ${transactionType}` },
            };
        };

        return{
            status: 200,
            data: transactionHistory,
        }

    } catch (error){
        console.error('Error in retrieving transaction by type: ', error);
        throw error;
    }
};

const getTransactionHistoryById = async ({ transactionId }) => {
    try{
        const transactionHistory = await TransactionHistory.findByPk(transactionId);

        if(!transactionHistory){
            throw{
                status: 404,
                data: { message: `Transaction history with the ${transactionId} id was not found.` },
            };
        };

        return{
            status: 200,
            data: transactionHistory,
        };

    } catch (error){
        console.error('Error in retrieving transaction by id: ', error);
        throw error;
    }
};

const getTransactionHistoryByCustomerId = async ({ customerId }) => {
    try{
        const transactionHistoryByCustomerId = await TransactionHistory.findAll({ where: { customerId: customerId } });
    
        if(!transactionHistoryByCustomerId){
            throw{
                status: 404,
                data: { message: `Transaction history with the Customer's ID of: ${customerId} was not found.` }, 
            };
        };

        return{
            status: 200,
            data: transactionHistoryByCustomerId,
        };

    } catch (error){
        console.error('Error in retrieving transaction by Customer\'s ID', error);
        throw error;
    }
};



module.exports = { getAllTransactionHistories, getTransactionHistoryByDate, getTransactionHistoryByType, getTransactionHistoryById, getTransactionHistoryByCustomerId };