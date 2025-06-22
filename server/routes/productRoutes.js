import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc   Get all products
// @route  GET /api/products
// @access Public
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc   Get single product by ID
// @route  GET /api/products/:id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format' });
  }
});

export default router;
