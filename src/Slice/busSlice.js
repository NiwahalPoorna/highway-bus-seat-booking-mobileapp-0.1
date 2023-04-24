import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  busDetails: null,
};

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    addBusDetails(state, action) {
      state.busDetails = action.payload;
    },
  },
});

export const { addBusDetails } = busSlice.actions;

export default busSlice.reducer;
