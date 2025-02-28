import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage for user details
const storedUser = JSON.parse(localStorage.getItem("user")) || {
  id: 0,
  name: "",
  email: "",
  DOB: "",
  phoneNumber: "",
  Image: null,
};

const initialState = {
  isLogin: localStorage.getItem("isLogin") === "true" || false,
  isSignup: localStorage.getItem("isSignup") === "true" || false,
  isLogout: false,
  isAdmin: false,
  isNotification: localStorage.getItem("isNotification") === "true" || true,
  user: storedUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupReducer: (state, action) => {
      state.isSignup = true;
      state.isLogin = true;
      state.user = action.payload;
      // Save data in localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("isSignup", "true");
    },
    loginReducer: (state, action) => {
      state.isLogin = true;
      state.isSignup = true;
      state.user = action.payload;
      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("isSignup", "true");
    },
    logoutReducer: (state) => {
      state.isLogout = true;
      state.isLogin = false;
      state.isSignup = false;
      state.isAdmin = false;
      state.isNotification = false;
      state.user = {
        id: 0,
        name: "",
        email: "",
        DOB: "",
        phoneNumber: "",
        Image: null,
      };
      // Clear user data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("isSignup");
      localStorage.removeItem("isNotification");
    },
    notificationReducer: (state) => {
      state.isNotification = !state.isNotification;
      localStorage.setItem("isNotification", state.isNotification.toString());
    },
  },
});

export const { signupReducer, loginReducer, logoutReducer, notificationReducer } = userSlice.actions;
export default userSlice.reducer;
