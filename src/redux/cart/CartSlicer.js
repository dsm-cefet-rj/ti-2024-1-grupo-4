import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    products: [],
    productsTotalQuantity: 0,
    productsTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart(state, action) {
            const itemIndex = state.products.findIndex(
                (item) => item.id === action.payload.id
            );

            if(itemIndex >= 0) {
                state.products[itemIndex].quantity += 1;
            } else {
                const tempProduct = {...action.payload, quantity: 1};
                state.products.push(tempProduct);
                toast.success(action.payload.nome + " adicionado ao carrinho", {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                });
            }
        },
        removeProductFromCart(state, action) {
            const nextProducts = state.products.filter(
                item => item.id !== action.payload
            );

            state.products = nextProducts;
        },
        decreaseProductQuantity(state, action) {
            const itemIndex = state.products.findIndex(
                (item) => item.id === action.payload
            );

            if(state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;
            } else if(state.products[itemIndex].quantity === 1) {
                const nextProducts = state.products.filter(
                    item => item.id !== action.payload
                );
    
                state.products = nextProducts;
            }
        },
    }
});

export const { addProductToCart, removeProductFromCart, decreaseProductQuantity} = cartSlice.actions;

export default cartSlice.reducer;