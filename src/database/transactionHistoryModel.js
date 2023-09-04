const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const TransactionHistory = sequelize.define('TransactionHistory', {
    
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customers', 
            key: 'id',
        },
    },
    transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transactionAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    transactionStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    transactionReference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    timeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = TransactionHistory;
