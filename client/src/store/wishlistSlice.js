import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Async Thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get('/api/wishlist', config);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);


export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`/api/wishlist/${productId}`, {}, config);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to toggle wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
  const productId = action.meta.arg;
  const index = state.items.findIndex(item => item._id === productId);

  if (index !== -1) {
    state.items.splice(index, 1); // remove
  } else {
    state.items.push({ _id: productId }); // add minimal reference
  }
});
  },
});

export default wishlistSlice.reducer;
