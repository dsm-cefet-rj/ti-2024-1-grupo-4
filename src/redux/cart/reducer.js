/* eslint-disable no-case-declarations */
import CartActionTypes from "./action-type";

const initialState = {
    products: [],
    productsTotalPrice: 0,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_PRODUCT:
            const productIsAlreadyInCart = state.products.some(
                (product) => product.id === action.payload.id
            );

            if (productIsAlreadyInCart) {
                return { 
                    ...state, 
                    products: state.products.map(product => 
                        product.id === action.payload.id 
                        ? { ...product, quantity: product.quantity + 1 } 
                        : product
                    )
                }
            }

            return {
                ...state,
                products: [...state.products, {...action.payload, quantity: 1}]
            }

        default:
            return state;
    }
}
export default cartReducer;