const db = require('../models');
const Order = db.order;
const OrderItem = db.orderItems;
const Product = db.product;
const Cart = db.cart;

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all cart items for the user
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: 'product' }]
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // Create order
    const order = await Order.create({ userId, totalAmount, status: 'pending' });

    // Create order items
    const orderItems = cartItems.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price
    }));

    await OrderItem.bulkCreate(orderItems);

    // Clear user's cart
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
