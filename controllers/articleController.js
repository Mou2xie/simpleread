const articleModel = require('../models/article');

async function saveArticle(req, res) {
    const { originalText, simplifiedText } = req.body;
    const userId = req.user.userId;

    if (!originalText || !simplifiedText) {
        return res.status(400).json({ error: 'Original text and simplified text are required' });
    }

    try {
        const articleId = await articleModel.saveArticle(userId, originalText, simplifiedText);
        res.status(201).json({ 
            message: 'Article saved successfully', 
            articleId 
        });
    } catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getArticlesList(req, res) {
    const userId = req.user.userId;

    try {
        const articles = await articleModel.getArticlesList(userId);
        res.json({ articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getArticleDetailsById(req, res) {
    const { id } = req.params;

    try {
        const article = await articleModel.getArticleDetailsById(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ article });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteArticle(req, res) {
    const { id } = req.params;

    try {
        const deleted = await articleModel.deleteArticle(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    saveArticle,
    getArticlesList,
    getArticleDetailsById,
    deleteArticle
};
