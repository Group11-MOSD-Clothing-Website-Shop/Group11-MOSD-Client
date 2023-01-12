import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
        numberOfPage: 1
    },
    reducers: {
        startFetching: (state) => {
            state.isFetching = true
            state.error = false
        },
        getProducts: (state, action) => {
            state.isFetching = false
            state.error = false
            state.products = action.payload.products
            state.numberOfPage = action.payload.numberOfPage
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
export const { startFetching, getProducts, fetchingError, resetError, endFetching } = productSlice.actions
export default productSlice.reducer