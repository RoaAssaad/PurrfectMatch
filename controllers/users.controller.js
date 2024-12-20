const { validationResult } = require('express-validator');
const {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    authenticate
} = require('../services/users.services');

// Controller for getting all users
const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for getting a user by ID
const getUserByIdController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for inserting a new user
const insertUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { User_Username, User_Email, User_Password, User_DOB } = req.body;
        const user = await insertUser(User_Username, User_Email, User_Password, User_DOB);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for updating a user
const updateUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { User_Username, User_Email, User_Password, User_DOB } = req.body;
        const user = await updateUser(req.params.id, User_Username, User_Email, User_Password, User_DOB);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for deleting a user
const deleteUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for authenticating a user
const authenticateController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { User_Email, User_Password } = req.body;
        const user = await authenticate(User_Email, User_Password);
        if (user) {
            req.session.user = user; // Use session to store user data
            res.redirect('/choice'); // Redirect to choice page
        } else {
            res.status(401).render('login', { title: 'Log In', error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsersController,
    getUserByIdController,
    insertUserController,
    updateUserController,
    deleteUserController,
    authenticateController
};
