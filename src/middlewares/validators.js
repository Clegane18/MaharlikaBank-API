const Joi = require ('joi');

const createAccountValidation = (req, res, next) => {
    const { error } = createAccountSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    next();
  }
  
const updateAccountValidation = (req, res, next) => {
    const { error } = updateAccountSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    next();
  };
    
  const createAccountSchema = Joi.object({
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_-]{8,30}$')).required(),
    currentBalance: Joi.number().min(500).required(),
    // profilePicture: Joi.string().required(),
  });

  const updateAccountSchema = Joi.object({
    email: Joi.string().email().min(3).max(30),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_-]{8,30}$')),
  });
  

module.exports = { createAccountValidation, updateAccountValidation };