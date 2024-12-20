const express = require('express');
const { 
    getAdoptionRequestsController, 
    getAdoptionRequestByIdController, 
    insertAdoptionRequestController, 
    updateAdoptionRequestController, 
    deleteAdoptionRequestController 
} = require('../controllers/adoption.requests.controller');
const { 
    insertAdoptionRequestValidation, 
    updateAdoptionRequestValidation, 
    getAdoptionRequestByIdValidation,
    deleteAdoptionRequestValidation
} = require('../validators/adoption.requests.validator');

const router = express.Router();

// Route to get all adoption requests
router.get('/adoption-requests', getAdoptionRequestsController);

// Route to get a single adoption request by ID
router.get('/adoption-request/:id', getAdoptionRequestByIdValidation, getAdoptionRequestByIdController);

// Route to create a new adoption request
router.post('/adoption-request', insertAdoptionRequestValidation, insertAdoptionRequestController);

// Route to update an existing adoption request
router.put('/adoption-request/:id', updateAdoptionRequestValidation, updateAdoptionRequestController);

// Route to delete an adoption request
router.delete('/adoption-request/:id', deleteAdoptionRequestValidation, deleteAdoptionRequestController);


// New EJS rendering routes
router.get('/', async (req, res) => {
    try {
        const adoptionRequests = await getAdoptionRequestsController();
        res.render('adoption', { title: 'Adoption Requests', adoptionRequests });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const adoption = await getAdoptionRequestByIdController(req, res);
        res.render('adoption-detail', { title: `Adoption Request #${adoption.Request_ID}`, adoption });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
