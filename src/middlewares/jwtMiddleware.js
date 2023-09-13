const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({ error: 'Access denied' });
    
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) return res.status(403).json({ error: 'Invalid token' });

        req.user = decoded;
        next();
    });
};

module.exports = { SecretKey: secretKey, authenticateToken };