const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../libs/jwt');

async function register(req, res) {
    const { email, password } = req.body;

    try {
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
        const userId = await userModel.createUser(email, password);
        res.status(201).json({ message: 'User created', userId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        
        // check email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        // find user by email
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // generate JWT token
        const token = generateToken({ userId: user.id, email: user.email });
        
        // return token and user info
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    register,
    login
};