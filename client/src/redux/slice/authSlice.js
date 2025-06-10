import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.loading = true;
      state.error = null;
    },

    signuperror: (state, action) => {
      state.error = action.payload;
    },

    otpVerificationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpVerificationSuccess: (state) => {
      state.loading = true;
      state.error = null;
    },

    otpVerificationerror: (state, action) => {
      state.error = action.payload;
    },
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.loading = true;
      state.error = null;
      state.user = action.payload;
      state.isAuth = true;
    },

    signinerror: (state, action) => {
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
    addressUpdateSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  addressUpdateSuccess,
  signinerror,
  logoutSuccess,
  signupSuccess,
  signinStart,
  signinSuccess,
  signuperror,
  signupStart,
  otpVerificationerror,
  otpVerificationSuccess,
  otpVerificationStart,
} = authSlice.actions;
export default authSlice.reducer;
