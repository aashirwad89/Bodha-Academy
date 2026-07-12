const jwt = require('jsonwebtoken');

// JWT Verification Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Magic seal is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden. The seal has expired or is invalid.' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateToken;
