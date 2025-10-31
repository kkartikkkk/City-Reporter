// authActions.js
import {
    loginSuccess,
    logoutSuccess,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
  } from "./AuthSlice";
  import axios from "axios";
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const API_URL_LOGIN = baseUrl + "/all/signin";
  const API_URL_SIGNUP = baseUrl + "/all/signup";
  
  export const createUserAction = (userData) => async (dispatch) => {
    try {
      dispatch(createUserRequest());
      console.log(userData);
      const response = await axios.post(API_URL_SIGNUP, userData);
  
      const { data } = response;
      console.log(data);
      if (data.statusType === "SUCCESS") {
        const { user, token } = data;

          // Store token and user
      localStorage.setItem("token", token);
      secureLocalStorage.setItem("user", JSON.stringify(user));

        dispatch(createUserSuccess(user));
        return { success: true, user };
      } else {
        return { success: false, user };
      }
  
      // localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch(createUserFailure(error.message));
      return { success: false, error: error.message };
    }
  };
  export const login = (userData) => async (dispatch) => {
    try {
      const response = await axios.post(API_URL_LOGIN, userData);
      const { data } = response;

       const { user, token } = data;

        // Save to local storage securely
    localStorage.setItem("token", token);
    secureLocalStorage.setItem("user", JSON.stringify(user));

      await dispatch(loginSuccess({ user }));
  
      return { success: true, data }; // Return success response
    } catch (error) {
      dispatch(createUserFailure(error?.response?.data)); // Dispatch failure action
      return { success: false, error: error?.response?.data }; // Return error response
    }
  };
  
  // export const regiseterUser = ()
  
  export const logout = () => (dispatch) => {
    dispatch(logoutSuccess());
  };