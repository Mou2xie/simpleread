const express = require('express');
const router = express.Router();
const simplifyController = require('../controllers/simplifyController');
const authMiddleware = require('../middleware/authMiddleware');

// need auth for translation
router.post('/', authMiddleware, simplifyController.simplify);

module.exports = router;
