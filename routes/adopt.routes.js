const express = require('express');
const router = express.Router();
const { getCatsController } = require('../controllers/cats.controller');

router.get('/', getCatsController);

module.exports = router;
