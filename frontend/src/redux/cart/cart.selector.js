/**
 * @module cart/cart.selector
 */
/**
 * @function
 * @description Calcula a quantidade de um item no carrinho
 * @param {Object} rootReducer 
 * @returns {number}
 */
export const selectProductsCount = (rootReducer) => {
    return rootReducer.cartSlicer.products.reduce(
        (acc, curr) => acc + curr.quantity , 0
    );
};

/**
 * @function
 * @description Calcula o valor total de um item no carrinho
 * @param {Object} rootReducer 
 * @returns {number}
 */
export const selectProductsTotalPrice = (rootReducer) => {
    return rootReducer.cartSlicer.products.reduce(
        (acc, curr) => acc + curr.preco * curr.quantity, 0
    );
}