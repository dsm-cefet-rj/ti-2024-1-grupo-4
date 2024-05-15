export const selectProductsCount = (rootReducer) => {
    return rootReducer.cartSlicer.products.reduce(
        (acc, curr) => acc + curr.quantity , 0
    );
};

export const selectProductsTotalPrice = (rootReducer) => {
    return rootReducer.cartSlicer.products.reduce(
        (acc, curr) => acc + curr.preco * curr.quantity, 0
    );
}