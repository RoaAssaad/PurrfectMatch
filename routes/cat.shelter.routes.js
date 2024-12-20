const express = require('express');
const { 
    insertCatShelterController, 
    getCatShelterByIdController, 
    updateCatShelterController, 
    deleteCatShelterController 
} = require('../controllers/cat.shelter.controller');
const { 
    insertCatShelterValidation, 
    updateCatShelterValidation, 
    getCatShelterByIdValidation,
    deleteCatShelterValidation
} = require('../validators/cat.shelter.validator');

const router = express.Router();

// Route to create a new cat shelter entry
router.post('/cat-shelter', insertCatShelterValidation, insertCatShelterController);

// Route to get cat shelter data by IDs
router.get('/cat-shelter/:Cat_ID/:Shelter_ID', getCatShelterByIdValidation, getCatShelterByIdController);

// Route to update an existing cat shelter entry
router.put('/cat-shelter/:Cat_ID/:Shelter_ID', updateCatShelterValidation, updateCatShelterController);

// Route to delete a cat shelter entry
router.delete('/cat-shelter/:Cat_ID/:Shelter_ID', deleteCatShelterValidation, deleteCatShelterController);


module.exports = router;
