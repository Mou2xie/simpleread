const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/save', authMiddleware, articleController.saveArticle);
router.get('/list', authMiddleware, articleController.getArticlesList);
router.get('/:id', authMiddleware, articleController.getArticleDetailsById);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
