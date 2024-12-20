const { query } = require("../database/db");
const moment = require("moment");

/**
 * Authenticates a user by their email and password.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Promise<Object|null>} - A promise that resolves to the user object if authentication is successful, null otherwise.
 */

const authenticate = async (email, password) => {
    try {
        let sql = `SELECT * FROM Users WHERE User_Email = ? AND User_Password = ?`;
        const user = await query(sql, [email, password]);
        return user[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 */

const getUsers = async () => {
    try {
        let sql = `SELECT * FROM Users`;
        const users = await query(sql);
        let formattedUsers = [];
        for (let user of users) {
            let formattedUser = {
                User_ID: user.User_ID,
                User_Username: user.User_Username,
                User_Email: user.User_Email,
                User_Password: user.User_Password,
                User_DOB: user.User_DOB ? moment(user.User_DOB).format("YYYY-MM-DD") : null
            };
            formattedUsers.push(formattedUser);
        }
        return formattedUsers;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a single user by their ID.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the user object if found, null otherwise.
 */

const getUserById = async (id) => {
    try {
        let sql = `SELECT * FROM Users WHERE User_ID = ?`;
        const users = await query(sql, [id]);
        const user = users[0];
        if (user) {
            return {
                User_ID: user.User_ID,
                User_Username: user.User_Username,
                User_Email: user.User_Email,
                User_Password: user.User_Password,
                User_DOB: user.User_DOB ? moment(user.User_DOB).format("YYYY-MM-DD") : null
            };
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new user into the database.
 * @param {string} username - User's username.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {Date|string} dob - User's date of birth.
 * @returns {Promise<Object>} - A promise that resolves to the newly created user object.
 */

const insertUser = async (username, email, password, dob) => {
    try {
        let sql = `INSERT INTO Users (User_Username, User_Email, User_Password, User_DOB) VALUES (?, ?, ?, ?)`;
        const formattedDOB = moment(dob).format("YYYY-MM-DD");
        const result = await query(sql, [username, email, password, formattedDOB]);
        return await getUserById(result.insertId);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates an existing user's information in the database.
 * @param {number} userId - The ID of the user to update.
 * @param {string} username - New or existing username.
 * @param {string} email - New or existing email.
 * @param {string} password - New or existing password.
 * @param {Date|string} dob - New or existing date of birth.
 * @returns {Promise<Object>} - A promise that resolves to the updated user object.
 */

const updateUser = async (userId, username, email, password, dob) => {
    try {
        let sql = `UPDATE Users SET User_Username = ?, User_Email = ?, User_Password = ?, User_DOB = ? WHERE User_ID = ?`;
        const formattedDOB = moment(dob).format("YYYY-MM-DD");
        await query(sql, [username, email, password, formattedDOB, userId]);
        return await getUserById(userId);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a user from the database based on their ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<string>} - A promise that resolves to a success message upon successful deletion.
 */

const deleteUser = async (id) => {
    try {
        let sql = `DELETE FROM Users WHERE User_ID = ?`;
        return await query(sql, [id]);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    authenticate,
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
};
