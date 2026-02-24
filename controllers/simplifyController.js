const openrouterService = require('../services/openrouter');

async function simplify(req, res) {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
    }
    
    try {
        const simplifiedText = await openrouterService.simplifyArticle(text);
        
        res.json({
            message: 'Article simplified successfully',
            originalLength: text.length,
            simplifiedLength: simplifiedText.length,
            result: simplifiedText
        });
    } catch (error) {
        console.error('Error simplifying article:', error);
        res.status(500).json({ error: 'Failed to simplify article' });
    }
}

module.exports = {
    simplify
};
