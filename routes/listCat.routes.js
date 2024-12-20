const express = require('express');
const router = express.Router();
const { insertCatController } = require('../controllers/cats.controller');
const { insertCatValidation } = require('../validators/cats.validator');

router.get('/', (req, res) => {
    res.render('listCat', { title: 'List a Cat for Adoption' });
});

router.post('/', insertCatValidation, insertCatController);

module.exports = router;
