import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProductFromCart, addProductToCart, decreaseProductQuantity } from '../../redux/cart/CartSlicer.js'; //cartSlicer

function CartItem( {product} ) {

    const dispatch = useDispatch();

    const handleRemoveClick = () => {
        dispatch(removeProductFromCart(product));
    }

    const handleIncreaseClick = () => {
        dispatch(addProductToCart(product));
    }

    const handleDecreaseClick = () => {
        dispatch(decreaseProductQuantity(product));
    }
    
    return (
        <>
            <div className="cardmb-1">
                <div className='card-body'>

                    <h5 className="card-title text-start">{product.nome}</h5>
                    <p className="card-text text-start">{product.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            {product.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </small>

                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <button type="button" className="btn btn-tacao" onClick={handleDecreaseClick}>-</button>
                            <span>{product.quantity}</span>
                            <button type="button" className="btn btn-tacao" onClick={handleIncreaseClick}>+</button>
                        </div>


                        <button type="button" className="btn btn-outline-brick-red jqustify-content-end" onClick={handleRemoveClick}>Remover</button>
                    </div>
                    <small className="text-muted">
                        ({(product.preco * product.quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})
                    </small>

                </div>
            </div>

        </>
    );
}
export default CartItem;
{/*
    <div className="card mb-1">
      <div className="card-body">  
            <h5 className="card-title">Card Title</h5>
            <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
      </div>
    </div>

*/}

{
    /**<aside class="bd-sidebar">
     *  <div class="offcanvas-lg offcanvas-start" tabindex="-1" id="bdSidebar" aria-labelledby="bdSidebarOffcanvasLabel">
     * <div class="offcanvas-body">
          <nav class="bd-links w-100" id="bd-docs-nav" aria-label="Docs navigation"><ul class="bd-links-nav list-unstyled mb-0 pb-3 pb-md-2 pe-lg-2">
      <li class="bd-links-group py-2">
        <strong class="bd-links-heading d-flex w-100 align-items-center fw-semibold">
            <svg class="bi me-2" style="color: var(--bs-indigo);" aria-hidden="true"><use xlink:href="#book-half"></use></svg>
          Getting started
        </strong>

        <ul class="list-unstyled fw-normal pb-2 small">
            <li><a href="/docs/5.3/getting-started/introduction/" class="bd-links-link d-inline-block rounded active" aria-current="page">Introduction</a></li>
            <li><a href="/docs/5.3/getting-started/download/" class="bd-links-link d-inline-block rounded">Download</a></li>
            <li><a href="/docs/5.3/getting-started/contents/" class="bd-links-link d-inline-block rounded">Contents</a></li>
            </u>
     * </aside>
     * 
     * 
     * 
     */
}