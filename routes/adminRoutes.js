// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // check JWT
const admin = require('../middleware/admin'); // check admin role

// Example: admin dashboard route
router.get('/dashboard', auth, admin, (req, res) => {
    res.json({ message: `Welcome Admin: ${req.user.email}` });
});

module.exports = router;
