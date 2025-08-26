

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.user;

//  Register
exports.register = async (req, res) => {
      console.log('Register request body:', req.body); // Log request body
    const { username, email, password, role } = req.body;

    try {
        // Check if email exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role : role || (email === 'admin@gmail.com' ? 'admin' : 'user')
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
         console.error('Register error:', error);  // Log error details
        res.status(500).json({ error: error.message });
    }
};

//  Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, email: user.email, role : user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1y' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
