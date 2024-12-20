const { query } = require("../database/db");

/**
 * Retrieves all cats from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of cat objects.
 */

const getCats = async () => {
    try {
        let sql = `SELECT * FROM Cats`;
        const cats = await query(sql);
        return cats;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a single cat by its ID.
 * @param {number} catId - The ID of the cat to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the cat object if found, null otherwise.
 */

const getCatById = async (catId) => {
    try {
        let sql = `SELECT * FROM Cats WHERE Cat_ID = ?`;
        const cat = await query(sql, [catId]);
        return cat[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new cat into the database.
 * @param {string} name - Name of the cat.
 * @param {Date} dob - Date of birth of the cat.
 * @param {string} breed - Breed of the cat.
 * @param {string} gender - Gender of the cat.
 * @param {string} healthStatus - Health status of the cat.
 * @param {string} description - Description of the cat.
 * @param {string} image - URL to an image of the cat.
 * @returns {Promise<Object>} A promise that resolves to the newly created cat object.
 */

const insertCat = async (name, dob, breed, gender, healthStatus, description, image) => {
    try {
        let sql = `INSERT INTO Cats (Cat_Name, Cat_DOB, Cat_Breed, Cat_Gender, Cat_HealthStatus, Cat_Description, Cat_Image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const result = await query(sql, [name, dob, breed, gender, healthStatus, description, image]);
        return await getCatById(result.insertId);
    } catch (error) {
        throw new Error(error);
    }
};


/**
 * Updates an existing cat in the database.
 * @param {number} catId - The ID of the cat to update.
 * @param {string} name - New name of the cat.
 * @param {Date} dob - New date of birth of the cat.
 * @param {string} breed - New breed of the cat.
 * @param {string} gender - New gender of the cat.
 * @param {string} healthStatus - New health status of the cat.
 * @param {string} description - New description of the cat.
 * @param {string} image - New URL to an image of the cat.
 * @returns {Promise<Object>} A promise that resolves to the updated cat object.
 */

const updateCat = async (catId, name, dob, breed, gender, healthStatus, description, image) => {
    try {
        let sql = `UPDATE Cats SET Cat_Name = ?, Cat_DOB = ?, Cat_Breed = ?, Cat_Gender = ?, Cat_HealthStatus = ?, Cat_Description = ?, Cat_Image = ? WHERE Cat_ID = ?`;
        await query(sql, [name, dob, breed, gender, healthStatus, description, image, catId]);
        return await getCatById(catId);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a cat from the database.
 * @param {number} catId - The ID of the cat to delete.
 * @returns {Promise<void>} A promise that resolves when the cat is successfully deleted.
 */

const deleteCat = async (catId) => {
    try {
        let sql = `DELETE FROM Cats WHERE Cat_ID = ?`;
        await query(sql, [catId]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Searches for cats in the database based on a keyword that matches their gender, breed, description, or health status.
 * @param {string} keyword - The keyword to search for in cat attributes.
 * @returns {Promise<Array>} A promise that resolves to an array of cat objects that match the keyword.
 */

const searchCats = async (keyword) => {
    try {
        let sql = `SELECT * FROM Cats WHERE 
        Cat_Gender LIKE "%${keyword}%" 
        OR Cat_Breed LIKE "%${keyword}%"
        OR Cat_Description LIKE "%${keyword}%"
        OR Cat_HealthStatus LIKE "%${keyword}%"`;
        const cats = await query(sql);
        return cats;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getCats,
    getCatById,
    insertCat,
    updateCat,
    deleteCat,
    searchCats
};
