const { check, param } = require('express-validator');

const insertAdoptionRequestValidation = [
    check('Request_Date').notEmpty().withMessage('Request date is required').isDate().withMessage('Invalid date format'),
    check('Request_Status').notEmpty().withMessage('Request status is required').isIn(['Pending', 'Approved', 'Denied', 'Cancelled']).withMessage('Invalid request status'),
    check('User_ID').isInt().withMessage('User ID must be an integer').notEmpty().withMessage('User ID is required'),
    check('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required')
];

const updateAdoptionRequestValidation = [
    param('Request_ID').isInt().withMessage('Request ID must be an integer').notEmpty().withMessage('Request ID is required'),
    check('Request_Date').optional().isDate().withMessage('Invalid date format'),
    check('Request_Status').optional().isIn(['Pending', 'Approved', 'Denied', 'Cancelled']).withMessage('Invalid request status'),
    check('User_ID').optional().isInt().withMessage('User ID must be an integer'),
    check('Cat_ID').optional().isInt().withMessage('Cat ID must be an integer')
];

const getAdoptionRequestByIdValidation = [
    param('Request_ID').isInt().withMessage('Request ID must be an integer').notEmpty().withMessage('Request ID is required')
];

const deleteAdoptionRequestValidation = [
    param('Request_ID').isInt().withMessage('Request ID must be an integer').notEmpty().withMessage('Request ID is required')
];

module.exports = {
    insertAdoptionRequestValidation,
    updateAdoptionRequestValidation,
    getAdoptionRequestByIdValidation,
    deleteAdoptionRequestValidation
};
