const { check, param } = require('express-validator');

const createFavoriteValidation = [
    check('User_ID')
        .isInt().withMessage('User ID must be an integer')
        .notEmpty().withMessage('User ID is required'),
    check('Cat_ID')
        .isInt().withMessage('Cat ID must be an integer')
        .notEmpty().withMessage('Cat ID is required')
];

const deleteFavoriteValidation = [
    param('User_ID')
        .isInt().withMessage('User ID must be an integer')
        .notEmpty().withMessage('User ID is required'),
    param('Cat_ID')
        .isInt().withMessage('Cat ID must be an integer')
        .notEmpty().withMessage('Cat ID is required')
];

module.exports = {
    createFavoriteValidation,
    deleteFavoriteValidation
};
