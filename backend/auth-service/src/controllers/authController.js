const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username)
    console.log(password)
    const user = await User.findOne({ username });
    console.log(user)
    if (user && (await comparePassword(password, user.password))) {
      const token = generateToken(user._id);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error logging in' });
  }
};
