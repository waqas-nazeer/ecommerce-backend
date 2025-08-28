const db = require("../models");
const Cart = db.cart;
const Product = db.product;

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // from jwt middleware

    // Check if product already in the cart
    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new cart entry
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all items in user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{
        model: Product,
        as: "product"
      }]
    });

    // Fix image URLs
    const fixedCart = cartItems.map(item => {
      if (item.product?.imageUrl) {
        item.product.imageUrl = `http://localhost:3000${item.product.imageUrl}`;
      }
      return item;
    });

    res.json(fixedCart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: err.message });
  }
};

  
// ✅ Clear all items in cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.destroy({ where: { userId } });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Remove single item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const deleted = await Cart.destroy({ where: { userId, productId } });

    if (deleted) {
      res.status(200).json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
