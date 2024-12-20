const { query } = require("../database/db");

/**
 * Retrieves all records from the Cat_Shelter table.
 * @returns {Promise<Array>} A promise that resolves to an array of cat-shelter relationships.
 */

const getCatShelters = async () => {
    try {
        let sql = `SELECT * FROM Cat_Shelter`;
        const catShelters = await query(sql);
        return catShelters;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a specific cat-shelter relationship based on cat and shelter IDs.
 * @param {number} catId - The ID of the cat.
 * @param {number} shelterId - The ID of the shelter.
 * @returns {Promise<Object|null>} A promise that resolves to the cat-shelter relationship if found, null otherwise.
 */

const getCatShelterById = async (catId, shelterId) => {
    try {
        let sql = `SELECT * FROM Cat_Shelter WHERE Cat_ID = ? AND Shelter_ID = ?`;
        const catShelter = await query(sql, [catId, shelterId]);
        return catShelter[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new cat-shelter relationship into the database.
 * @param {number} catId - The ID of the cat.
 * @param {number} shelterId - The ID of the shelter.
 * @param {Date} dateArrived - The date when the cat arrived at the shelter.
 * @returns {Promise<void>} A promise that resolves when the entry is successfully added.
 */

const insertCatShelter = async (catId, shelterId, dateArrived) => {
    try {
        let sql = `INSERT INTO Cat_Shelter (Cat_ID, Shelter_ID, Date_Arrived) VALUES (?, ?, ?)`;
        await query(sql, [catId, shelterId, dateArrived]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates a cat-shelter relationship in the database.
 * @param {number} catId - The ID of the cat originally associated with the shelter.
 * @param {number} shelterId - The original ID of the shelter associated with the cat.
 * @param {number} newShelterId - The new shelter ID to which the cat is moving.
 * @param {Date} dateArrived - The new date of arrival at the new shelter.
 * @returns {Promise<void>} A promise that resolves when the entry is successfully updated.
 */

const updateCatShelter = async (catId, shelterId, newShelterId, dateArrived) => {
    try {
        let sql = `UPDATE Cat_Shelter SET Shelter_ID = ?, Date_Arrived = ? WHERE Cat_ID = ? AND Shelter_ID = ?`;
        await query(sql, [newShelterId, dateArrived, catId, shelterId]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a cat-shelter relationship from the database.
 * @param {number} catId - The ID of the cat involved in the relationship.
 * @param {number} shelterId - The ID of the shelter involved in the relationship.
 * @returns {Promise<void>} A promise that resolves when the entry is successfully deleted.
 */

const deleteCatShelter = async (catId, shelterId) => {
    try {
        let sql = `DELETE FROM Cat_Shelter WHERE Cat_ID = ? AND Shelter_ID = ?`;
        await query(sql, [catId, shelterId]);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getCatShelters,
    getCatShelterById,
    insertCatShelter,
    updateCatShelter,
    deleteCatShelter
};
