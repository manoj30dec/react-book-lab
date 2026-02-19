// store.js
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './reducers/counterSlice';
import rootReducers from './reducers';

// const store = configureStore({
//   reducer: {
//     counter: counterReducer, // Add your slice reducers here
//   },
// });
const store = configureStore({
  reducer: rootReducers
});
window.store = store;
export default store;
