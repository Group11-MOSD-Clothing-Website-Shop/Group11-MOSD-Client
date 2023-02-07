import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: "product",
    initialState: {
        orders: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        startFetching: (state) => {
            state.isFetching = true
            state.error = false
        },
        getOrders: (state, action) => {
            state.isFetching = false
            state.error = false
            state.orders = action.payload
        },
        fetchingError: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        resetError: (state) => {
            state.error = false
        },
        endFetching: (state) => {
            state.isFetching = false
            state.error = false
        }
    }
})
export const { startFetching, getOrders, fetchingError, resetError, endFetching } = orderSlice.actions
export default orderSlice.reducer