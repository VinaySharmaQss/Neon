import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';

// Function to load state from localStorage and wrap it with a 'user' key
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) return undefined; // No state saved, use initial state
    return { user: JSON.parse(serializedState) };
  } catch (err) {
    console.error("Error loading state:", err);
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

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

// Subscribe to store updates and save only the user slice to localStorage
store.subscribe(() => {
  saveState(store.getState().user);
});

export default store;
