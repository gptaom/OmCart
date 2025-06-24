import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';

// ✅ Load cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load cart:', error);
    return [];
  }
};

// ✅ Save cart state to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

// ✅ Preload the cart from localStorage
const preloadedState = {
  cart: {
    items: loadCartFromLocalStorage(),
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
});

// ✅ Subscribe to save on cart change
store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart.items);
});

export default store;
