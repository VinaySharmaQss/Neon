import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './features/user';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) return undefined; // No state saved, use initial state
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Load state from localStorage
const preloadedState = loadState();


 const store = configureStore({
  reducer: {
    user: userSlice,
  },
  preloadedState,
});

// Subscribe to store updates and save state changes
store.subscribe(() => {
  saveState(store.getState().user);
});

export default store;