const express = require('express');
const router = express.Router();
const {
    getSheltersController,
    insertShelterController,
    getShelterByIdController,
    updateShelterController,
    deleteShelterController,
    searchSheltersController
} = require('../controllers/shelters.controller');

// Route to display all shelters or return them as JSON
router.get('/', getSheltersController);

// Route to create a new shelter
router.post('/', insertShelterController);

// Route to get details of a specific shelter by ID
router.get('/:id', getShelterByIdController);

// Route to update a specific shelter by ID
router.put('/:id', updateShelterController);

// Route to delete a specific shelter by ID
router.delete('/:id', deleteShelterController);

// Route to search shelters based on a keyword
router.get('/search', searchSheltersController);

module.exports = router;
