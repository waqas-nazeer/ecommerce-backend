        const express = require('express');
        const router = express.Router();
        const auth = require('../middleware/auth');

        // import all functions including clearCart
        const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartcontroller');

        // ✅ Debug log to check imported functions
// console.log({ addToCart, getCart, removeFromCart, clearCart });

        // Add to cart
        router.post('/add', auth, addToCart);

        // Get cart items
        router.get('/', auth, getCart);

        
        // ✅ Clear full cart
        router.delete('/clear', auth, clearCart);
        
        // Remove single item from cart
        router.delete('/remove/:productId', auth, removeFromCart);  
        module.exports = router;
