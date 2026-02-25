const pool = require('../libs/database');

// article model
const Article = {

    saveArticle: async (userId, originalText, simplifiedText) => {
        const [result] = await pool.query(
            'INSERT INTO articles (user_id, original_text, simplified_text) VALUES (?, ?, ?)',
            [userId, originalText, simplifiedText]
        );
        return result.insertId;
    },

    getArticlesList: async (userId) => {
        const [rows] = await pool.query(
            'SELECT id, original_text, created_at, updated_at FROM articles WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    },

    getArticleDetailsById: async (articleId) => {
        const [rows] = await pool.query(
            'SELECT id, user_id, original_text, simplified_text, created_at, updated_at FROM articles WHERE id = ?',
            [articleId]
        );
        return rows[0];
    },

    deleteArticle: async (id) => {
        const [result] = await pool.query(
            'DELETE FROM articles WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};

module.exports = Article;
