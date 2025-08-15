


const express = require('express');
const { register, login } = require('../controllers/usercontroller');

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
