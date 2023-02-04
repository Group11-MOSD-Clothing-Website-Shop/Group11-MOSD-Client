import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        total_tez: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
            state.total_tez = Math.round(state.total / action.payload.xtzPrice)
        },
        deleteProduct: (state, action) => {
            state.quantity -= 1
            state.products = state.products.filter(product => product._id !== action.payload.productId)
            state.total -= action.payload.amount
            state.total_tez = Math.round(state.total / action.payload.xtzPrice)
        },
        updateCartProduct: (state, action) => {
            state.total += action.payload.amount
            state.total_tez = Math.round(state.total / action.payload.xtzPrice)
            state.products = state.products.map(product => {
                if (product?._id === action.payload.productId) {
                    const updateProduct = {
                        ...product,
                        quantity: product.quantity + action.payload.quantity
                    }
                    return updateProduct
                }
                return product
            })
        },
        getUserCart: (state, action) => {
            state.products = action.payload
            state.quantity = action.payload.length
            state.total = action.payload.reduce((acc, currentProduct) => acc + currentProduct.price * currentProduct.quantity, 0)
        },
        emptyCart: (state) => {
            state.total = 0
            state.total_tez = 0
            state.quantity = 0
            state.products = []
        }
    }
})
export const { emptyCart, addProduct, deleteProduct, updateCartProduct, getUserCart } = cartSlice.actions
export default cartSlice.reducer