const { query } = require("../database/db");


/**
 * Retrieves all shelters from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of shelter objects.
 */

const getShelters = async () => {
    try {
        let sql = `SELECT * FROM Shelters`;
        const shelters = await query(sql);
        return shelters;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a single shelter by its ID.
 * @param {number} shelterId - The ID of the shelter to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the shelter object if found, null otherwise.
 */

const getShelterById = async (shelterId) => {
    try {
        let sql = `SELECT * FROM Shelters WHERE Shelter_ID = ?`;
        const shelter = await query(sql, [shelterId]);
        return shelter[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new shelter into the database.
 * @param {string} name - The name of the shelter.
 * @param {string} address - The address of the shelter.
 * @param {string} contactInfo - Contact information for the shelter.
 * @returns {Promise<Object>} A promise that resolves to the newly created shelter object.
 */

const insertShelter = async (name, address, contactInfo) => {
    try {
        let sql = `INSERT INTO Shelters (Shelter_Name, Shelter_Address, Shelter_ContactInfo) VALUES (?, ?, ?)`;
        const result = await query(sql, [name, address, contactInfo]);
        return await getShelterById(result.insertId);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates an existing shelter's information in the database.
 * @param {number} shelterId - The ID of the shelter to update.
 * @param {string} name - New or existing name.
 * @param {string} address - New or existing address.
 * @param {string} contactInfo - New or existing contact information.
 * @returns {Promise<Object>} A promise that resolves to the updated shelter object.
 */

const updateShelter = async (shelterId, name, address, contactInfo) => {
    try {
        let sql = `UPDATE Shelters SET Shelter_Name = ?, Shelter_Address = ?, Shelter_ContactInfo = ? WHERE Shelter_ID = ?`;
        await query(sql, [name, address, contactInfo, shelterId]);
        return await getShelterById(shelterId);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a shelter from the database based on its ID.
 * @param {number} shelterId - The ID of the shelter to delete.
 */

const deleteShelter = async (shelterId) => {
    try {
        let sql = `DELETE FROM Shelters WHERE Shelter_ID = ?`;
        await query(sql, [shelterId]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Searches shelters by a keyword that matches any part of their name or address.
 * @param {string} keyword - The keyword to search for in the shelter's name or address.
 * @returns {Promise<Array>} A promise that resolves to an array of shelters that match the keyword.
 */

const searchShelters = async (keyword) => {
    try {
        let sql = `SELECT * FROM Shelters WHERE 
        Shelter_Name LIKE "%${keyword}%"
        OR Shelter_Address LIKE "%${keyword}%"`;
        const shelters = await query(sql);
        return shelters;
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = {
    getShelters,
    getShelterById,
    insertShelter,
    updateShelter,
    deleteShelter,
    searchShelters
};
