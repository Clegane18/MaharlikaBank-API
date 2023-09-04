'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TransactionHistories', {
            transactionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Customers',
                    key: 'id',
                },
            },
            transactionType: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            transactionAmount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: 0,
                },
            },
            transactionStatus: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            transactionReference: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            timeStamp: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TransactionHistories');
    },
};
