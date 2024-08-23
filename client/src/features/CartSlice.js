import { createSlice } from "@reduxjs/toolkit"
import { addDecimals, updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : { cartItems: [] }



const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existingItem = state.cartItems.find((x) => x._id === item._id)
            if (existingItem) {
                state.cartItems = state.cartItems.map(x => x._id === existingItem._id ? item : x)
            }
            else {
                state.cartItems = [...state.cartItems, item]
            }
            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter((item) => item._id !== id)
        }


    }
});



export const { addToCart, removeFromCart } = CartSlice.actions

export default CartSlice.reducer;