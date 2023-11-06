import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,fetchItemsByUserId, updateCart,deleteCartItem } from './cartAPI';

const initialState = {
  status: 'idle',
  items:[],
};
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const updateItemsAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemsAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const indx=state.items.findIndex(item=>item.id===action.payload.id);
        state.items[indx]=action.payload;
      })
      .addCase(deleteItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const indx=state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(indx,1);
      })
  },
});

export const { increment, incrementByAmount } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;
export default counterSlice.reducer;
