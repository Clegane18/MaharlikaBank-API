const Customer  = require ('../database/customerModel');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const { createTokenWithExpiration } = require ('../utils/customerUtils');
const { SecretKey } = require ('../middlewares/jwtMiddleware');
const secretKey = SecretKey;




const getAllCustomers = async () => {
    try{
        const customers = await Customer.findAll({
            order: [['id', 'ASC']],
        });

        return{
            status: 200,
            data: customers,
        };
        
    } catch (error){
        console.error('Error retrieving customers:', error);
        throw error;
    }
};

const getCustomerById = async ({ customerId }) => {
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw {
                status: 404,
                data: { message: `Customer not found with ID: ${customerId}` },
            };
        };
        return{
            status: 200,
            data: customer,
        };
    } catch(error){
        console.error('Error in getCustomerById:', error)
        throw error;
    }
}; 

const updateCustomerById = async ({ customerId, email, password, profilePicture }) => {
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw {
                status: 404,
                data: { message: `Customer not found with ID: ${customerId}` }
            };
        }

        if(email) customer.email = email;

        if(password){
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            customer.password = hashedPassword;
        }

        if (profilePicture) {
            const filename = profilePicture.filename;

            customer.profilePicture = filename;
        }

        const token = createTokenWithExpiration({ email: customer.email }, '15m');

        await customer.save();
        return{
            status: 200,
            message: 'Customer information updated successfully',
            token: token,
        };
    } catch (error){
        console.error('Error in updataCustomerById:', error)
        throw error;
    };   
};

const deleteCustomerById = async ({ customerId }) => {
    try{
        const customer = await Customer.findByPk(customerId);

        if(!customer){
            throw{
                status: 404,
                data: { message: `Customer not found with ID: ${customerId}` },
            };
        };
        await customer.destroy();
        return{
            status: 200,
            message: 'Customer deleted successfully',
        }
    } catch (error){
        console.error('Error in deleteCustomerById:', error);
        throw error;
    };
};

const signIn = async ({ email, password, currentBalance, profilePicture }) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newCustomer = await Customer.create({
            email: email,
            password: hashedPassword,
            currentBalance: currentBalance,
            profilePicture: profilePicture ? `${email}_profilePicture_${profilePicture.filename}` : null,
        });

        // const token = jwt.sign({ email: newCustomer.email }, secretKey );
        const token = createTokenWithExpiration({ email: newCustomer.email }, '30m')
        return{
            status: 200,
            message: 'Customer created successfully',
            token: token,
        }
    } catch (error){
        console.error('Error in signIn service:', error);
        throw error;
    };
};

const logIn = async ({ email, password }) => {
    try{
        const customer = await Customer.findOne({ where: { email: email } });

        if(!customer){
            throw{
                status: 404,
                data: { message: 'Customer not found' },
            };
        };

        const hashedPassword = customer.password;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        if(isPasswordMatch){
            
            const token = createTokenWithExpiration({
                id: customer.id, 
                email: customer.email,
                password: customer.password,
                currentBalance: customer.currentBalance 
            }, '30m')

            return{
                status: 200,
                message: 'Successful log in',
                token: token
            };
        } else {
            throw{
                status: 401,
                data: { message: 'Incorrect password' },
            };
        };
    } catch(error){
        console.error('Error in log in:', error);
        throw error;
    };
};


module.exports = {getAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById, signIn, logIn};
