import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        order: null,
        error: null,
    },
    reducers: {
        placeOrderStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        placeOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = null;
        },
        placeOrderError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
})