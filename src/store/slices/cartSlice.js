import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        user: "Demo",
        updatedAt: new Date().toLocaleString(),
        cartItems: [],
        total: 0
    },
    reducers: {
        addItemTocart: (state, action) => {
            const {product, quantity} = action.payload
            console.log("Añadiendo producto al carrito: ", product,quantity)
            const productInCart = state.cartItems.find(item=>item.id===product.id)
            if(!productInCart){
                state.cartItems.push({...product,quantity})
            }else{
                productInCart.quantity+=1
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc,item)=> acc + item.price*item.quantity, 0)
        },
        removeItemFromCart: (state, action) => {
            const productId = action.payload; 
            console.log("Eliminando producto del carrito: ", productId);
            
            state.cartItems = state.cartItems.filter(item => item.id !== productId);
            
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        clearCart: (state) => { 
            state.cartItems = [];
            state.total = 0;
            state.updatedAt = new Date().toLocaleString();
        }
    }
})

export const { addItemTocart , removeItemFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer