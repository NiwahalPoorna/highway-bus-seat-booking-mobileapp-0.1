// SeatSelectorSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seatCount: 1,
  totalPrice: 0,
};

const seatSelectorSlice = createSlice({
  name: 'seatSelector',
  initialState,
  reducers: {
    updateSeatCount(state, action) {
      state.seatCount = action.payload;
    },
    updateTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const { updateSeatCount, updateTotalPrice } = seatSelectorSlice.actions;

export default seatSelectorSlice.reducer;
