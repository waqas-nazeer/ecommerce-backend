// routes/adminRoutes.js
const express = require('express');
const auth = require('../middleware/auth'); // check JWT
const superAdmin = require('../middleware/superAdmin')
const adminController = require('../controllers/admincontroller');

const router = express.Router();


router.get('/users', auth , superAdmin , adminController.getAllUsers);
router.get('/users/:id', auth, superAdmin , adminController.getUserById);
router.delete('/users/:id',auth,superAdmin, adminController.deleteUser);
router.put('/users/:id/role', auth, superAdmin, adminController.changeUserRole);





module.exports = router;
