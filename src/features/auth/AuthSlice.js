import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

export const loadAuthState = () => {
  try {
    const serializedState = secureLocalStorage.getItem("user");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(
      "Error loading authentication state from localStorage:",
      error
    );
    return null;
  }
};

const initialState = {
  isAuthenticated: false,
  user: localStorage.getItem("user")
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : null,
  loading: false,
};

const storedAuthState = loadAuthState();
const combinedInitialState = {
  ...initialState,
  ...storedAuthState,
};

const authSlice = createSlice({
  name: "auth",
  initialState: combinedInitialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      secureLocalStorage.setItem("user", JSON.stringify(action.payload));
      state.loading = false;
     
    },
    logoutSuccess: (state) => {
   
      state.isAuthenticated = false;
      state.user = null;
      secureLocalStorage.removeItem("user");
    },
    refreshData: (state) => {
      state.loading = true; // Set loading state to true while fetching
    },
    createUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      state.error = null;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


export const {
  loginSuccess,
  logoutSuccess,
  refreshData,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} = authSlice.actions;
export default authSlice.reducer;