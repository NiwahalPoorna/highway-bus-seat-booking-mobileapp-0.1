// import { createSlice } from "@reduxjs/toolkit";

// const seatSlice = createSlice({
//   name: "seat",
//   initialState: [],
//   reducers: {
//     addSeat: (state, action) => {
//       state.push(action.payload);
//     },
//     removeSeat: (state, action) => {
//       return state.filter((seat) => seat !== action.payload);
//     },
//     clearSeats: () => [],
//   },
// });

// export const { addSeat, removeSeat, clearSeats } = seatSlice.actions;
// export default seatSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const seatSlice = createSlice({
//   name: "seat",
//   initialState: [],
//   reducers: {
//     addSeat: (state, action) => {
//       state.push(action.payload);
//     },
//     removeSeat: (state, action) => {
//       return state.filter((seat) => seat !== action.payload);
//     },
//     clearSeats: () => [],
//   },
// });

// export const { addSeat, removeSeat, clearSeats } = seatSlice.actions;
// export default seatSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const seatSlice = createSlice({
  name: "seat",
  initialState: {
    seats: [],
    totalPrice: 0,
  },
  reducers: {
    addSeat: (state, action) => {
      const seatIndex = action.payload;
      state.seats.push(seatIndex );
      state.totalPrice = state.seats.length * state.price;
    },
    removeSeat: (state, action) => {
      const seatIndex = action.payload;
      state.seats = state.seats.filter((seat) => seat !== seatIndex);
      state.totalPrice = state.seats.length * state.price;
    },
    clearSeats: (state) => {
      state.seats = [];
      state.totalPrice = 0;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
      state.totalPrice = state.seats.length * state.price;
    },
  },
});

export const { addSeat, removeSeat, clearSeats, setPrice } = seatSlice.actions;
export const selectSeats = (state) => state.seat.seats;
export const selectTotalPrice = (state) => state.seat.totalPrice;
export default seatSlice.reducer;
