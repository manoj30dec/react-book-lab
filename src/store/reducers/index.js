import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from "./counterSlice";
import bookReducer from "./bookSlice"

const rootReducers = combineReducers({ 
  counter:counterReducer,
  books:bookReducer
 });
export default rootReducers;
