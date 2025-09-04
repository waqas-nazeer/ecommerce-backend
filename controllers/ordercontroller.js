
  const db = require('../models');
const { sequelize, order: Order, orderItems: OrderItem, product: Product, cart: Cart } = db;

exports.placeOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { items, deliveryDetails } = req.body;

    // ✅ Check if selected items exist
    if (!items || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'No items selected for order' });
    }

    let totalAmount = 0;

    // ✅ Create order first (totalAmount = 0)
    const order = await Order.create(
      {
        userId,
        totalAmount: 0,
        status: 'pending',
        deliveryDetails
      },
      { transaction: t }
    );

    // ✅ Loop through only selected items
    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      if (product.stock < item.quantity)
        throw new Error(`Not enough stock for ${product.name}`);

      await OrderItem.create(
        {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price
        },
        { transaction: t }
      );

      totalAmount += product.price * item.quantity;

      // ✅ Reduce stock
      await product.update(
        { stock: product.stock - item.quantity },
        { transaction: t }
      );

      // ✅ Remove only ordered items from cart
      await Cart.destroy({
         where: { userId, productId: product.id } ,
        transaction: t
      });
    }

    // ✅ Update order total
    order.totalAmount = totalAmount;
    await order.save({ transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price', 'imageUrl'] }]
      }],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'totalAmount', 'status', 'createdAt', 'deliveryDetails']
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orderId = req.params.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const order = await Order.findOne({
      where: { id: orderId, userId },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price', 'imageUrl'] }]
      }]
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
