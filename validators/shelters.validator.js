const { check, param } = require('express-validator');

const insertShelterValidation = [
    check('Shelter_Name').notEmpty().withMessage('Shelter name is required'),
    check('Shelter_Address').notEmpty().withMessage('Shelter address is required'),
    check('Shelter_ContactInfo').notEmpty().withMessage('Contact information is required')
];

const updateShelterValidation = [
    param('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required'),
    check('Shelter_Name').optional().notEmpty().withMessage('Shelter name cannot be empty'),
    check('Shelter_Address').optional().notEmpty().withMessage('Shelter address cannot be empty'),
    check('Shelter_ContactInfo').optional().notEmpty().withMessage('Contact information cannot be empty')
];

const getShelterByIdValidation = [
    param('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required')
];

const deleteShelterValidation = [
    param('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required')
];

const searchSheltersValidation = [
    check('keyword')
        .isString().withMessage('Keyword must be a string')
        .notEmpty().withMessage('Keyword is required')
        .isLength({ max: 100 }).withMessage('Keyword must not be more than 100 characters long')
];

module.exports = {
    insertShelterValidation,
    updateShelterValidation,
    getShelterByIdValidation,
    deleteShelterValidation,
    searchSheltersValidation
};
