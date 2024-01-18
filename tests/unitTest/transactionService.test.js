const transactionService = require('../../src/services/transactionService');
const Customer = require('../../src/database/customerModel');
const mockData = require('../../src/utils/mockData.UnitTest');
const transactionUtils = require('../../src/utils/transaction.utils');

jest.mock('../../src/database/customerModel', () => ({
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
        prototype: {
            save: jest.fn(),
            destroy: jest.fn(),
            where: jest.fn(),
          },
    }));

jest.mock('../../src/utils/transaction.utils', () => ({
    generateTransactionReceipt: jest.fn(),
    createTransactionHistory: jest.fn(),
}));


describe('Handles successful deposit', () => {
    it('should deposit to customer\'s account and create transaction history and create transaction receipt', async () => {
       
       const customerId = 1;
       const mockCustomer = {
            ...mockData[0],
            depositAmount: 500, 
            save: jest.fn(),
       };

       Customer.findByPk.mockResolvedValue(customerId);

       const transaction = await transactionUtils.createTransactionHistory({
            customerId: customerId,
            transactionType: 'Deposit',
            transactionAmount: mockCustomer.depositAmount,
            transactionStatus: 'Success',
            description: 'Deposit transaction',
       });

       mockData[0].currentBalance += mockCustomer.depositAmount;

       const transactionHistory = transactionUtils.generateTransactionReceipt(transaction);

       const result = await transactionService.deposit({
            customerId: customerId,
            depositAmount: mockCustomer.depositAmount,
       })

       expect(result.status).toBe(200);
       expect(result.data.message).toBe(`Deposit successful. The updated balance is ${mockData[0].currentBalance.toLocaleString()}`);
       expect(result.data.TransactionReceipt).toEqual(transactionHistory);

       expect(Customer.findByPk).toHaveBeenCalledWith(customerId);
       expect(mockCustomer.save).toHaveBeenCalled();

       expect(transactionUtils.createTransactionHistory).toHaveBeenCalledWith({
            customerId: customerId,
            transactionType: 'Deposit',
            transactionAmount: mockCustomer.depositAmount,
            transactionStatus: 'Success',
            description: 'Deposit transaction',
       });

       expect(transactionUtils.generateTransactionReceipt).toHaveBeenCalledWith(transaction);
    });
});