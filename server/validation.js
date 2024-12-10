import Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 3 characters long',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Must be a valid email',
    'any.required': 'Email is required',
  }),
  role: Joi.string().required().messages({
    'string.empty': 'Role cannot be empty',
    'any.required': 'Role is required',
    
  }),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.empty': 'username cannot be empty'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'email cannot be empty',
    'string.email': 'Must be a valid email',
    
  }),
  role: Joi.string().required().messages({
    'string.empty': 'Role cannot be empty',
    
  }),
});
