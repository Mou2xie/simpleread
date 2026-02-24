const userModel = require('../models/user');

async function register(req, res) {
    const { email, password } = req.body;
    
    // check email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // check if email is already registered
    const isEmailTaken = await userModel.isEmailTaken(email);
    if (isEmailTaken) {
        return res.status(409).json({ error: 'Email already registered' });
    }
    
    // create user
    try {
        const userId = await userModel.createUser(email, password);
        res.status(201).json({ message: 'User created', userId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    register
};