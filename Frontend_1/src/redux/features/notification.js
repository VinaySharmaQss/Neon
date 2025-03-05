import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload); // Add new notification to the start
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
