import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        existItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(x => x._id === id);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
