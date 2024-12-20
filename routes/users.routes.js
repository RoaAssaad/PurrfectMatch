const express = require('express');
const {
    getUsersController,
    insertUserController,
    authenticateController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} = require('../controllers/users.controller');
const {
    createUserValidation,
    updateUserValidation,
    getUserByIdValidation,
    deleteUserValidation,
    authenticateUserValidation
} = require('../validators/users.validator');

const router = express.Router();

// Route to render the sign-up form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// Route to create a new user
router.post('/signup', createUserValidation, insertUserController);

// Route to render the login form
router.get('/login', (req, res) => {
    res.render('login', { title: 'Log In' });
});

router.post('/login', authenticateUserValidation, authenticateController, (req, res) => {
    res.redirect('/choice');
});

router.get('/choice', (req, res) => {
    res.render('choice', { title: 'What would you like to do?' });
});

// Route for user authentication
router.post('/login', authenticateUserValidation, authenticateController);

// Route to update an existing user
router.put('/user/:id', updateUserValidation, updateUserController);

// Route to get all users
router.get('/users', getUsersController);

// Route to get a single user by ID
router.get('/user/:id', getUserByIdValidation, getUserByIdController);

// Route to delete a user
router.delete('/user/:id', deleteUserValidation, deleteUserController);

module.exports = router;
