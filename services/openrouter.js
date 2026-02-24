const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function simplifyArticle(article) {
    const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
            'X-Title': 'SimpleRead'
        },
        body: JSON.stringify({
            model: process.env.OPENROUTER_MODEL,
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that simplifies English articles. Rewrite the given article in grade 6 level English. Keep the main ideas but use simpler vocabulary and shorter sentences. Making it easier for English beginers to understand.'
                },
                {
                    role: 'user',
                    content: `Please simplify the following article:\n\n${article}`
                }
            ]
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenRouter API error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

module.exports = {
    simplifyArticle
};
