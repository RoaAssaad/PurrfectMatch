const express = require('express');
const { 
    getCatsController, 
    insertCatController, 
    getCatByIdController, 
    updateCatController, 
    deleteCatController,
    searchCatsController 
} = require('../controllers/cats.controller');
const { 
    insertCatValidation, 
    updateCatValidation, 
    getCatByIdValidation, 
    deleteCatValidation,
    searchCatsValidation 
} = require('../validators/cats.validator');

const router = express.Router();

// Route to get all cats
router.get('/', getCatsController); 

// Route to create a new cat
router.post('/cat', insertCatValidation, insertCatController);

// Route to get a single cat by ID
router.get('/cat/:id', getCatByIdValidation, getCatByIdController);

// Route to update an existing cat
router.put('/cat/:id', updateCatValidation, updateCatController);

// Route to delete a cat
router.delete('/cat/:id', deleteCatValidation, deleteCatController);


// Route to search for cats
router.get('/cats/search/:keyword', searchCatsValidation , searchCatsController);

// EJS rendering routes
router.get('/', async (req, res) => {
    try {
        const cats = await getCatsController();
        res.render('cats', { title: 'Cat Profiles', cats });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cat = await getCatByIdController(req, res);
        res.render('profile', { title: `${cat.Cat_Name}'s Profile`, cat });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;
