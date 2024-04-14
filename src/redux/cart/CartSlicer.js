import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    products: [],
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
                toast.info(action.payload.nome + " teve quantidade alterado para " + state.products[itemIndex].quantity, {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 4000,
                });
            } else {
                const tempProduct = {...action.payload, quantity: 1};
                state.products.push(tempProduct);
                toast.success(action.payload.nome + " adicionado ao carrinho", {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 4000,
                });
            }
        },
        removeProductFromCart(state, action) {
            const nextProducts = state.products.filter(
                item => item.id !== action.payload.id
            );

            state.products = nextProducts;
            toast.warning(action.payload.nome + " removido", {
                position: "bottom-left",
                className: "text-spicy-mix bg-banana-mania shadow",
                autoClose: 4000,
            });
        },
        decreaseProductQuantity(state, action) {
            const itemIndex = state.products.findIndex(
                (item) => item.id === action.payload.id
            );

            if(state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;
                toast.info(action.payload.nome + " teve quantidade alterado para " + state.products[itemIndex].quantity, {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 4000,
                });
            } else if(state.products[itemIndex].quantity === 1) {
                const nextProducts = state.products.filter(
                    item => item.id !== action.payload.id
                );
    
                state.products = nextProducts;
                toast.warning(action.payload.nome + " removido", {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 4000,
                });
            }
        },
    }
});

export const { addProductToCart, removeProductFromCart, decreaseProductQuantity} = cartSlice.actions;

export default cartSlice.reducer;