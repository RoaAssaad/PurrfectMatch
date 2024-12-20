const { check, param } = require('express-validator');

const insertCatShelterValidation = [
    check('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required'),
    check('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required'),
    check('Date_Arrived').notEmpty().withMessage('Date Arrived is required').isDate().withMessage('Invalid date format')
];

const updateCatShelterValidation = [
    param('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required'),
    param('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required'),
    check('New_Shelter_ID').optional().isInt().withMessage('New Shelter ID must be an integer'),
    check('Date_Arrived').optional().isDate().withMessage('Invalid date format')
];

const getCatShelterByIdValidation = [
    param('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required'),
    param('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required')
];

const deleteCatShelterValidation = [
    param('Cat_ID').isInt().withMessage('Cat ID must be an integer').notEmpty().withMessage('Cat ID is required'),
    param('Shelter_ID').isInt().withMessage('Shelter ID must be an integer').notEmpty().withMessage('Shelter ID is required')
];

module.exports = {
    insertCatShelterValidation,
    updateCatShelterValidation,
    getCatShelterByIdValidation,
    deleteCatShelterValidation
};
