const db = require('../database/db');

/**
 * Inserts a new adoption request into the database.
 * @param {Object} requestDetails - The details of the adoption request.
 * @param {string} requestDetails.Request_Date - The date of the request.
 * @param {string} requestDetails.Request_Status - The status of the request.
 * @param {number} requestDetails.User_ID - The ID of the user making the request.
 * @param {number} requestDetails.Cat_ID - The ID of the cat being requested.
 * @returns {Promise<Object>} - The newly inserted adoption request.
 */

const insertAdoptionRequest = async (requestDetails) => {
    const { Request_Date, Request_Status, User_ID, Cat_ID } = requestDetails;
    const query = `
        INSERT INTO adoption_requests (Request_Date, Request_Status, User_ID, Cat_ID)
        VALUES (?, ?, ?, ?);
    `;
    const values = [Request_Date, Request_Status, User_ID, Cat_ID];
    const client = await db.getConnection();
    try {
        await client.query(query, values);
        const [rows] = await client.query('SELECT * FROM adoption_requests WHERE Request_ID = LAST_INSERT_ID();');
        return rows[0];
    } catch (error) {
        throw new Error('Failed to insert adoption request: ' + error.message);
    } finally {
        client.release();
    }
};

/**
 * Retrieves all adoption requests made by a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - An array of adoption requests.
 */
const getAdoptionRequestsByUser = async (userId) => {
    const query = `
        SELECT ar.*, c.Cat_Name
        FROM adoption_requests ar
        JOIN Cats c ON ar.Cat_ID = c.Cat_ID
        WHERE ar.User_ID = ?;
    `;
    const values = [userId];
    const [rows] = await db.query(query, values);
    return rows;
};

/**
 * Deletes an adoption request by ID.
 * @param {number} id - The ID of the adoption request.
 * @returns {Promise<void>} - Resolves when the deletion is complete.
 */

const deleteAdoptionRequest = async (id) => {
    const query = 'DELETE FROM adoption_requests WHERE Request_ID = ?';
    const values = [id];
    await db.query(query, values);
};

module.exports = {
    insertAdoptionRequest,
    getAdoptionRequestsByUser,
    deleteAdoptionRequest
};
