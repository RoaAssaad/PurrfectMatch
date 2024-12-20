const { query } = require("../database/db");


/**
 * Retrieves all favorites from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of favorite objects.
 */

const getFavorites = async () => {
    try {
        let sql = `SELECT * FROM Favorites`;
        const favorites = await query(sql);
        return favorites;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a favorite by user ID and cat ID.
 * @param {number} userId - The ID of the user.
 * @param {number} catId - The ID of the cat.
 * @returns {Promise<Object|null>} A promise that resolves to the favorite object if found, null otherwise.
 */

const getFavoriteById = async (userId, catId) => {
    try {
        let sql = `SELECT * FROM Favorites WHERE User_ID = ? AND Cat_ID = ?`;
        const favorite = await query(sql, [userId, catId]);
        return favorite[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Adds a favorite entry for a user and a cat into the database.
 * @param {number} userId - The ID of the user.
 * @param {number} catId - The ID of the cat.
 * @returns {Promise<Object>} A promise that resolves to the newly created favorite object.
 */

const createFavorite = async (userId, catId) => {
    try {
        let sql = `INSERT INTO Favorites (User_ID, Cat_ID, Date_Added) VALUES (?, ?, CURDATE())`;
        const result = await query(sql, [userId, catId]);
        return await getFavoriteById(userId, catId);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a favorite entry from the database based on user ID and cat ID.
 * @param {number} userId - The ID of the user.
 * @param {number} catId - The ID of the cat.
 * @returns {Promise<string>} A promise that resolves to a success message.
 */

const deleteFavorite = async (userId, catId) => {
    try {
        let sql = `DELETE FROM Favorites WHERE User_ID = ? AND Cat_ID = ?`;
        await query(sql, [userId, catId]);
        return `Favorite for User ID ${userId} and Cat ID ${catId} deleted successfully.`;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getFavorites,
    getFavoriteById,
    createFavorite,
    deleteFavorite
};
