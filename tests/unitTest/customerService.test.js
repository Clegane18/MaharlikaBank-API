// const customerService = require('../../src/services/customerService');
// const Customer = require('../../src/database/customerModel');
// const bcrypt = require('bcrypt');
// const { createTokenWithExpiration } = require('../../src/utils/token.util');
// const { createErrorObjectWithStatus, createErrorObjectForFailedUpdate, createErrorObjectForInvalidPassword } = require('../../src/utils/customerServiceUnitTest.utils');
// const mockData = require('../../src/utils/mockData.UnitTest');

// jest.mock('../../src/database/customerModel', () => ({
//     findAll: jest.fn(),
//     findByPk: jest.fn(),
//     create: jest.fn(),
//     findOne: jest.fn(),
//     prototype: {
//         save: jest.fn(),
//         destroy: jest.fn(),
//         where: jest.fn(),
//       },
// }));

// jest.mock('../../src/utils/token.util', () => ({
//     createTokenWithExpiration: jest.fn(() => 'mockedToken'),
// }));

// jest.mock('bcrypt', () => ({
//     hash: jest.fn(async (password, saltRounds) => {
//       return 'mockedHashedPassword'; 
//     }),
//     compare: jest.fn(async (password, hashedPassword) => {
//         return 'hashed_password_1'
//     }),
//   }));


// describe('Handles successful rerieval of Customers', () => {
    
//     it('should retrieve all the customers', async () => {
//         Customer.findAll.mockResolvedValue(mockData);
        
//         const result = await customerService.getAllCustomers();
    
//         expect(Customer.findAll).toHaveBeenCalled();
//         expect(result.status).toBe(200);
//         expect(result.data).toEqual(mockData);
//     });

//     it('should retrieve customer by ID', async () => {
//         const customerId = 1; 
//         Customer.findByPk.mockResolvedValue(mockData[0]);
 
//         const result = await customerService.getCustomerById({ customerId });
 
//         expect(result.status).toBe(200);
//         expect(result.data).toEqual(mockData[0]);
//      });
// });

// describe('Handles failed retrieval of Customers', () => {
    
//     it('should handle failed retrieval of all customers', async () => {
//         const errorMessage = 'Error retrieving customers';
        
//         jest.spyOn(Customer, 'findAll').mockRejectedValue(new Error(errorMessage));

//         try{
//             await customerService.getAllCustomers();
//             fail('Expected get all Customers should throw and error');
//         } catch (error) {
//             expect(Customer.findAll).toHaveBeenCalled();
//             expect(error.message).toBe(errorMessage);
//         };
//     });

//     it('should handle failed retrieval of Customer by ID', async () => { 
//         const customerId = 3; 
//         const result = {
//             errorMessage: 'Customer with the given ID was not found.', 
//             status: 404,
//         };

//         const errorObject = createErrorObjectWithStatus(result.errorMessage, result.status);
        
//         jest.spyOn(Customer, 'findByPk').mockRejectedValue(errorObject);

//         try{
//             await customerService.getCustomerById(customerId);
//             fail('Expected get customer by ID should throw and error');
//         } catch (error) {
//             expect(Customer.findByPk).toHaveBeenCalled();
//             expect(error.message).toBe(result.errorMessage);
//             expect(error.status).toBe(result.status);
//         };
//     });
// });

// describe('Handle successful updating of customer\'s data', () => {

//     it('should update customer\'s data by ID', async () => {
//         const customerId = 1;
//         const customerUpdatedData = {
//             email: 'newEmail@gmail.com',
//             password: 'newPassword', 
//             profilePicture: { filename: 'newProfilePicture.jpg' },
//         };
    
//         const mockCustomer = {
//             ...mockData[0],
//             save: jest.fn(),
//         };
    
//         Customer.findByPk.mockResolvedValue(mockCustomer);
    
//         const result = await customerService.updateCustomerById({
//             customerId,
//             email: customerUpdatedData.email,
//             password: customerUpdatedData.password,
//             profilePicture: customerUpdatedData.profilePicture,
//         });
    
//         expect(Customer.findByPk).toHaveBeenCalledWith(customerId);
    
//         expect(mockCustomer.save).toHaveBeenCalled();
        
//         expect(result.status).toBe(200);
//         expect(result.message).toBe('Customer information updated successfully');
//         expect(result.token).toBeDefined();
    
//         mockCustomer.email = customerUpdatedData.email;
    
//         expect(mockCustomer.email).toBe(customerUpdatedData.email);
//         expect(mockCustomer.password).toBe('mockedHashedPassword'); 
//         expect(mockCustomer.profilePicture).toBe(customerUpdatedData.profilePicture.filename);
//     });
// });

// describe('Handle failed update on customer\'s data', () => {
//     it('should handle customer\'s ID not found', async () => {
//         const customerId = 3;
//         const mockData = {
//             email: 'newEmail@gmail.com',
//             password: 'newPassword', 
//             profilePicture: { filename: 'newProfilePicture.jpg' },
//         };
        
//         const result = {
//             errorMessage: 'Customer with the given ID was not found.',
//             status: 404,
//         };

//         const errorObjectStatus = createErrorObjectWithStatus(result.errorMessage, result.status);
        
//         jest.spyOn(Customer, 'findByPk').mockRejectedValue(errorObjectStatus);

//         try{
//             await customerService.updateCustomerById({
//                 customerId,
//                 email: mockData.email,
//                 password: mockData.password,
//                 profilePicture: mockData.profilePicture,
//             });
//             fail('Expected update customer by ID should throw and error');
//         } catch (error) {
//             expect(Customer.findByPk).toHaveBeenCalled();
//             expect(error.message).toBe(result.errorMessage);
//             expect(error.status).toBe(result.status);
//         };
//     });
    
//     it('should handle customer\s Invalid format input', async () => {
//         const customerId = 1;

//         const WrongMockData = {
//             email: 'newEmail.com',
//             password: 'Pass', 
//             profilePicture: { filename: 'newProfilePicture' },
//         };  

//         const errorMessage = {
//             wrongEmailMessage: 'Invalid Email format.',
//             wrongPasswordMessage: 'Weak Password',
//             wrongProfilePictureMessage: 'Invalid ProfilePicture format.',
//             status: 400,
//         };

//         const errorObject = createErrorObjectForFailedUpdate(
//             errorMessage.wrongEmailMessage,
//             errorMessage.wrongPasswordMessage,
//             errorMessage.wrongProfilePictureMessage,
//             errorMessage.status
//         );

//         jest.spyOn(Customer, 'findByPk').mockRejectedValue(errorObject);

//         try{
//             await customerService.updateCustomerById({
//                 customerId,
//                 email: WrongMockData.email,
//                 password: WrongMockData.password,
//                 profilePicture: WrongMockData.profilePicture,
//             });
//             fail('Expected update customer by ID should throw and error');
//         } catch (error) {
//             expect(Customer.findByPk).toHaveBeenCalled();
//             expect(error.message).toBe(errorMessage.wrongEmailMessage);
//             expect(error.wrongPasswordMessage).toBe(errorMessage.wrongPasswordMessage);
//             expect(error.wrongProfilePictureMessage).toBe(errorMessage.wrongProfilePictureMessage);
//             expect(error.status).toBe(errorMessage.status);
//         };
//     });
// });

// describe('Handles successful Deleting of customer\'s account', () => {
//     it('should delete customer\'s account', async () => {
//         const customerId = 1;
        
//         const mockCustomer = {
//             ...mockData[0],
//             destroy: jest.fn(),
//         };

//         Customer.findByPk.mockResolvedValue(mockCustomer);

//         expect(Customer.findByPk).toHaveBeenCalledWith(customerId);

//         const result = await customerService.deleteCustomerById({ customerId });

//         expect(mockCustomer.destroy).toHaveBeenCalled();

//         expect(result.status).toBe(200);
//         expect(result.message).toBe('Customer deleted successfully');
//     });
// });

// describe('Handles failed Deleting of customer\'s account', () => {
//     it('should handles failed deletion of customer\'s account', async () => {
//         const customerId = 3;
//         const result = {
//             message: 'Customer with the given ID was not found,',
//             status: 404,
//         };

//         const errorObject = createErrorObjectWithStatus(result.message, result.status);
//         const destroySpy = jest.spyOn(Customer.prototype, 'destroy');

//         jest.spyOn(Customer, 'findByPk').mockRejectedValue(errorObject);
        
//         try{
//             await customerService.deleteCustomerById({ customerId });
//             fail('Expected delete customer by ID should throw and error');
//         } catch (error) {
//             expect(Customer.findByPk).toHaveBeenCalled();
//             expect(destroySpy).not.toHaveBeenCalled();
//             expect(error.message).toBe(result.message);
//             expect(error.status).toBe(result.status);
//         };
//     });
// });

// describe('Handles successful creation of customer\'s account', () => {
//     it('should create customer\'s account', async () => {
//         const customerId = 3;
//         const saltRounds = 10;
//         const password = 'newPassword';

//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const newCustomer = {   
//             id: customerId,
//             email: 'newEmail@gmail.com',
//             password: hashedPassword,
//             currentBalance: 500,
//             profilePicture: { filename: 'newEmail@gmail.com.jpg' },
//         };

//         Customer.create.mockResolvedValue(newCustomer);
        
//         const result = await customerService.signIn({
//             id: newCustomer.id,
//             email: newCustomer.email,
//             password: newCustomer.password,
//             currentBalance: newCustomer.currentBalance,
//             profilePicture: newCustomer.profilePicture
//         });

//         expect(result.status).toBe(200);
//         expect(result.message).toEqual('Customer account created successfully');
//         expect(result.token).toBeDefined();

//         expect(Customer.create).toHaveBeenCalled();

//         expect(bcrypt.hash).toHaveBeenCalled();
//     });
// });

// describe('Handles failed creation of customer\'s account', () => {
//     it('should handle failed creation of customer\'s account', async () => {
//         const customerId = 3;
//         const saltRounds = 10;
//         const password = 'failedPassword';

//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const newCustomer = {
//             id: customerId,
//             email: 'failedEmail@gmail.com',
//             password: hashedPassword,
//             currentBalance: 500,
//             profilePicture: { filename: 'failedEmail@gmail.com.jpg' }
//         };

//         const errorMessage = {
//             wrongEmailMessage: 'Invalid Email format.',
//             wrongPasswordMessage: 'Weak Password',
//             wrongProfilePictureMessage: 'Invalid ProfilePicture format.',
//             status: 400,
//         };

//         const errorObject = createErrorObjectForFailedUpdate(
//             errorMessage.wrongEmailMessage,
//             errorMessage.wrongPasswordMessage,
//             errorMessage.wrongProfilePictureMessage,
//             errorMessage.status
//         );

//         jest.spyOn(Customer, 'create').mockRejectedValue(errorObject);

//         try{
//             await customerService.signIn({
//                 id: newCustomer.id,
//                 email: newCustomer.email,
//                 password: newCustomer.password,
//                 profilePicture: newCustomer.profilePicture,
//             });
//             fail('Expected create customer should throw and error');
//         } catch (error) {
//             expect(Customer.create).toHaveBeenCalled();
//             expect(error.message).toBe(errorMessage.wrongEmailMessage);
//             expect(error.wrongPasswordMessage).toBe(errorMessage.wrongPasswordMessage);
//             expect(error.wrongProfilePictureMessage).toBe(errorMessage.wrongProfilePictureMessage);
//             expect(error.status).toBe(errorMessage.status);
//         };
//     });
// });

// describe('Handles successful log in of customer\'s account', () => {
//     it('should successfully log in customer\'s existing account', async () => {
//         const email = 'customer1@example.com';
//         const password = 'hashed_password_1';
        
//         Customer.findOne.mockResolvedValue(mockData[0].email);

//         bcrypt.compare.mockResolvedValue(true);

//         const result = await customerService.logIn({ email, password });

//         expect(result.status).toBe(200);
//         expect(result.message).toEqual('Successful log in');
//         expect(result.token).toBeDefined();

//         expect(Customer.findOne).toHaveBeenCalledWith({
//             where: {
//                 email: email,
//             },
//         });
//         // expect(bcrypt.compare).toHaveBeenCalledWith(
//         //     password, mockData[0].password
//         // ); 
//         expect(bcrypt.compare).toHaveBeenCalled();
//     });
// }); 

// describe('Handles failed log in of customer\'s account', () => {
//     it('should handle customer\'s email not found', async () => {
//         const email = 'example@gmail.com';
//         const password = 'examplePassword';

//         const result = {
//             errorMessage: 'Customer email not found.',
//             status: 404,
//         };
        
//         const errorObjectStatus = createErrorObjectWithStatus(result.errorMessage, result.status);
        
//         jest.spyOn(Customer, 'findOne').mockRejectedValue(errorObjectStatus);

//         try{
//             await customerService.logIn({
//                 email: email,
//                 password: password,
//             });
//             fail('Expected log in should throw and error');
//         } catch (error) {
//             expect(error.message).toBe(result.errorMessage);
//             expect(error.status).toBe(result.status);

//             expect(Customer.findOne).toHaveBeenCalledWith({
//                 where: {
//                     email: email,
//                 },
//             });

//         };
//     });

//     it('should handle customer\'s invalid password', async () => {
//         const email = 'invalidEmail@gmail.com';
//         const password = 'invalidPassword';

//         const errorMessage = { invalidPasswordMessage: 'Incorrect password' };

//         const errorObject = createErrorObjectForInvalidPassword( errorMessage.invalidPasswordMessage );
        
//         jest.spyOn(Customer, 'findOne').mockRejectedValue(errorObject);
        
//         try{
//             await customerService.logIn({
//                 email: email,
//                 password: password,
//             });
//             fail('Expected log in should throw and error');
//         } catch (error) {
//             expect(Customer.findOne).toHaveBeenCalled();
//             expect(error.message).toBe(errorMessage.invalidPasswordMessage);
//             expect(error.status).toBe(errorMessage.status);
//             expect(Customer.findOne).toHaveBeenCalled();
//         };
//     });
// });

// describe('Handles successful calculation of all customer\'s current balance', () => {
//     it('should calculate all customer\'s current balance', async () => {
        
//         Customer.findAll.mockResolvedValue(mockData);

//         let totalBalance = 0;

//         for(const customer of mockData) {
//             totalBalance += customer.currentBalance;
//         };

//         const expectedValue = totalBalance;

//         const result = await customerService.calculatesAllTotalBalance();

//         expect(Customer.findAll).toHaveBeenCalled();

//         expect(result.status).toBe(200);
//         expect(result.message).toBe('Success in retrieving the Total Balance of all Customers.');
//         expect(result.CustomersTotalBalance).toEqual(expectedValue.toLocaleString());
//     });
// });

// describe('Handles failed calculation of all customer\'s current balance', () => {
//     it('should handle failed calculation of all customer\'s current balance', async () => {
        
//         const errorMessage = 'Failed to fetch all customer\'s';

//         jest.spyOn(Customer, 'findAll').mockRejectedValue(new Error(errorMessage));
        
//         try{
//             await customerService.calculatesAllTotalBalance();
//             fail('Expect an error to be thrown');
//         } catch (error) {
//             expect(Customer.findAll).toHaveBeenCalled();
//             expect(error.message).toBe(errorMessage);
//         };
//     });
// });