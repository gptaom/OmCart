import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  shippingAddress: {},
  paymentMethod: '',           // ✅ add default
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find((x) => x._id === item._id);
      if (exist) {
        exist.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const prod = state.items.find((x) => x._id === id);
      if (prod) prod.quantity = quantity;
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    // ✅ use ONLY ONE payment-method reducer
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.shippingAddress = {};
      state.paymentMethod = '';
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  saveShippingAddress,
  setPaymentMethod,   // ✅ export the single reducer
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
