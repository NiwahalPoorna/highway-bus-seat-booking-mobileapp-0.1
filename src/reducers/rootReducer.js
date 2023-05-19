import { combineReducers } from "redux";
import busReducer from "../Slice/busSlice";
import seatSelectorReducer from "../Slice/SeatSelectorSlice";
import userlogReducer from "../Slice/authSlice";

import seatReducer from "../Slice/seatSlice";

const rootReducer = combineReducers({
  bus: busReducer,
  seatSelector: seatSelectorReducer,
  userlog: userlogReducer,

  seat: seatReducer,
});

export default rootReducer;
