const pool = require('../libs/database');
const bcrypt = require('bcryptjs');

// user model
const User = {

    createUser: async (email, password) => {
        // hash password 
        const passwordHash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, passwordHash]
        );
        return result.insertId;
    },

    // check email already exists
    isEmailTaken: async (email) => {
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS count FROM users WHERE email = ?',
            [email]
        );
        return rows[0].count > 0;
    },
}

module.exports = User;