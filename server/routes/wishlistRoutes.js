import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { toggleWishlistItem, getWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/:productId', protect, toggleWishlistItem);

export default router;
