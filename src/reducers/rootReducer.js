import { combineReducers } from 'redux';
import busReducer from "../Slice/busSlice";
import seatSelectorReducer from "../Slice/SeatSelectorSlice";
import userlogReducer from "../Slice/authSlice";


const rootReducer = combineReducers({
  bus: busReducer,
  seatSelector: seatSelectorReducer,
  userlog:userlogReducer

});

export default rootReducer;

