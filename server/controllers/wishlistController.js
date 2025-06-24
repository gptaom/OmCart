import User from '../models/userModel.js';
import Product from '../models/productModel.js';

export const toggleWishlistItem = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  if (!user) return res.status(404).json({ message: 'User not found' });

  const index = user.wishlist.findIndex((id) => id.toString() === productId);

  if (index !== -1) {
    user.wishlist.splice(index, 1); // remove
  } else {
    user.wishlist.push(productId); // add
  }

  await user.save();
  res.status(200).json(user.wishlist);
};

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.status(200).json(user.wishlist);
};
