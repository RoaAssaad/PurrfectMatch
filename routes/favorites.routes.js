const express = require('express');
const {
    getFavoritesController,
    getFavoriteByIdController,
    createFavoriteController,
    deleteFavoriteController
} = require('../controllers/favorites.controller');
const {
    createFavoriteValidation,
    deleteFavoriteValidation
} = require('../validators/favorites.validator');

const router = express.Router();

// Route to get all favorites
router.get('/favorites', getFavoritesController);

// Route to get a specific favorite by user and cat IDs
router.get('/favorites/:userId/:catId', getFavoriteByIdController);

// Route to create a new favorite
router.post('/favorites', createFavoriteValidation, createFavoriteController);

// Route to delete a specific favorite
router.delete('/favorites/:userId/:catId', deleteFavoriteValidation, deleteFavoriteController);


// New EJS rendering routes
router.get('/', async (req, res) => {
    try {
        const favorites = await getFavoritesController();
        res.render('favorites', { title: 'Favorite Cats', favorites });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:userId/:catId', async (req, res) => {
    try {
        await deleteFavoriteController(req, res);
        res.redirect('/api/favorites');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
