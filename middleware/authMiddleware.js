const { verifyToken } = require('../libs/jwt');

function authMiddleware(req, res, next) {
    // get token from Authorization header
    const authHeader = req.headers.authorization;
    
    // check if token is provided and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // extract token from header
    const token = authHeader.split(' ')[1];
    
    // verify token
    try {
        const decoded = verifyToken(token);
        // attach decoded user info to request object
        req.user = decoded;
        next();  // excute next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;
