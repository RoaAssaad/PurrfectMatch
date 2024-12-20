const { check, param } = require('express-validator');

const createUserValidation = [
    check('User_Username').notEmpty().withMessage('Username is required'),
    check('User_Email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
    check('User_Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('User_DOB').notEmpty().withMessage('Date of birth is required').isDate().withMessage('Date of birth must be a valid date')
];

const updateUserValidation = [
    param('User_ID').isInt().withMessage('User ID must be an integer').notEmpty().withMessage('User ID is required'),
    check('User_Username').optional().notEmpty().withMessage('Username cannot be empty'),
    check('User_Email').optional().isEmail().withMessage('Invalid email format'),
    check('User_Password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('User_DOB').optional().isDate().withMessage('Date of birth must be a valid date')
];

const getUserByIdValidation = [
    param('User_ID').isInt().withMessage('User ID must be an integer').notEmpty().withMessage('User ID is required')
];

const deleteUserValidation = [
    param('User_ID').isInt().withMessage('User ID must be an integer').notEmpty().withMessage('User ID is required')
];

const authenticateUserValidation = [
    check('User_Email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
    check('User_Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required')
];

module.exports = {
    createUserValidation,
    updateUserValidation,
    getUserByIdValidation,
    deleteUserValidation,
    authenticateUserValidation
};
