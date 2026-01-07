const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js');

router.post('/form', indexController.form);

module.exports = router;