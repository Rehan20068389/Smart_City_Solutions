//Referance from youtube:"https://youtu.be/tBObk72EYYw?si=IGXbiNqtLD-ReXBw"
//Referance from chatgpt:"https://chatgpt.com/share/693ac586-38b8-8008-890e-ab3f41dd6abb"
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //checking if the user exists there
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);

    //create the user
    const user = await User.create({ name, email, password: hashed, role });

    res.json({ message: 'User created', 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
     });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });

     // my own modifications
    if (user.isActive === false) {
      return res.status(403).json({ error: 'Your account is disabled. Contact admin.' });
    }


    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Wrong password' });


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
exports.getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json(req.user);
};

