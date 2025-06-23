import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Order from '../models/orderModel.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({
      message: 'Internal server error while creating order',
      error: error.message, // optional: only in dev
    });
  }
});

export default router;
