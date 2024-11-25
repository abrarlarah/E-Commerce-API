const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const { User } = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let totalAmount = 0;
    for (const { id, quantity } of products) {
      const product = await Product.findByPk(id);
      if (!product || product.stock < quantity) {
        return res.status(400).json({ error: `Product ${id} not available in sufficient quantity` });
      }
      totalAmount += product.price * quantity;
      product.stock -= quantity;
      await product.save();
    }

    const order = await Order.create({ userId, totalAmount });
    await order.addProducts(products.map(({ id }) => id));
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Product],
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.id },
      include: [Product],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
