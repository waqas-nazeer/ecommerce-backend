
const  express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/ordercontroller')


// Place order (from cart)
router.post('/place', auth, orderController.placeOrder);

// Get user's orders
router.get('/', auth, orderController.getOrders);


// Get single order (invoice)
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;