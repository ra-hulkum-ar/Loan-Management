const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

async function register(req, res) {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username & password required' });
  try {
    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(400).json({ message: 'username already taken' });
    const user = await User.create({ username, password, role: role || 'USER' });
    return res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username & password required' });
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await user.validPassword(password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login };
