const express = require("express");
const { connect } = require("./database/db");
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // Add this line
const port = process.env.PORT || 3001;
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.static('public'));

// Use sessions for tracking logins
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true in production with HTTPS
}));

// Import route files
const userRoutes = require('./routes/users.routes');
const catRoutes = require('./routes/cats.routes');
const shelterRoutes = require('./routes/shelters.routes');
const adoptionRequestRoutes = require('./routes/adoption.requests.routes');
const catShelterRoutes = require('./routes/cat.shelter.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const aboutRoutes = require('./routes/about.routes');
const adoptRoutes = require('./routes/adopt.routes');
const listCatRoutes = require('./routes/listCat.routes');

// Route for the root URL
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Purrfect Match' });
});

// Use routes
app.use('/', userRoutes);
app.use('/api/cats', catRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/adoption-requests', adoptionRequestRoutes);
app.use('/api/cat-shelter', catShelterRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/', aboutRoutes);
app.use('/adopt', adoptRoutes);
app.use('/list-cat', listCatRoutes);

// Handle any unspecified routes with a 404 message
app.use((req, res) => {
    res.status(404).render('404', { title: '404: Page not found' });
});

// Connect to the database before starting the server
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});
