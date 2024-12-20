const { check, param } = require('express-validator');

const insertCatValidation = [
    check('Cat_Name').notEmpty().withMessage('Cat name is required'),
    check('Cat_DOB').optional().isDate().withMessage('Date of birth must be a valid date'),
    check('Cat_Breed').optional(),
    check('Cat_Gender').notEmpty().withMessage('Cat gender is required').isIn(['F', 'M']),
    check('Cat_HealthStatus').optional(),
    check('Cat_Description').optional(),
    check('Cat_Image').optional()
];

const updateCatValidation = [
    param('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required'),
    check('Cat_Name').optional().notEmpty().withMessage('Cat name cannot be empty'),
    check('Cat_DOB').optional().isDate().withMessage('Date of birth must be a valid date'),
    check('Cat_Breed').optional(),
    check('Cat_Gender').optional().isIn(['F', 'M']),
    check('Cat_HealthStatus').optional(),
    check('Cat_Description').optional(),
    check('Cat_Image').optional()
];

const getCatByIdValidation = [
    param('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required')
];

const deleteCatValidation = [
    param('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required')
];

const searchCatsValidation = [
    check('keyword')
        .notEmpty().withMessage('Search keyword is required')
        .isString().withMessage('Search keyword must be a string')
        .isLength({ max: 100 }).withMessage('Search keyword must not be more than 100 characters long')
];

module.exports = {
    insertCatValidation,
    updateCatValidation,
    getCatByIdValidation,
    deleteCatValidation,
    searchCatsValidation
};
