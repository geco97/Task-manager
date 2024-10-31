const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

module.exports = { generateToken };