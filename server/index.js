import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount the product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
