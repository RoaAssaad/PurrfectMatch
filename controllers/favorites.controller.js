const { validationResult } = require('express-validator');
const {
    getFavorites,
    getFavoriteById,
    createFavorite,
    deleteFavorite
} = require('../services/favorites.services');

const getFavoritesController = async (req, res) => {
    try {
        const favorites = await getFavorites();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFavoriteByIdController = async (req, res) => {
    const { User_ID, Cat_ID } = req.params;
    try {
        const favorite = await getFavoriteById(User_ID, Cat_ID);
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error" });
    }

    try {
        const { User_ID, Cat_ID } = req.body;
        const newFavorite = await createFavorite(User_ID, Cat_ID);
        res.status(201).json({ message: "Favorite created", favorite: newFavorite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFavoriteController = async (req, res) => {
    const { User_ID, Cat_ID } = req.params;
    try {
        await deleteFavorite(User_ID, Cat_ID);
        res.status(200).json({ message: "Favorite deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFavoritesController,
    getFavoriteByIdController,
    createFavoriteController,
    deleteFavoriteController
};
