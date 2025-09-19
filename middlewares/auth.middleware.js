const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = { id: user.id, username: user.username, role: user.role };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid/expired token' });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (Array.isArray(role)) {
      if (!role.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    } else {
      if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
