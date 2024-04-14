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
            <div className="card">
                <img className="card-img-top" src={product.imgUrl} alt=""></img>
                <div className="card-body d-flex flex-column justify-content-between align-items-stretch">
                    <h5 className="card-title">{product.nome}</h5>
                    <p className="card-text">{product.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            {product.preco.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}
                        </small>
                        
                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <button type="button" className="btn btn-tacao" onClick={handleDecreaseClick}>-</button>
                            <span>{product.quantity}</span>
                            <button type="button" className="btn btn-tacao" onClick={handleIncreaseClick}>+</button>
                        </div>
                        
                        
                        <button type="button" className="btn btn-outline-brick-red" onClick={handleRemoveClick}>Remover</button>
                    </div>
                    <small className="text-muted">
                    ({(product.preco * product.quantity).toLocaleString('pt-br',{style: 'currency', currency:'BRL'})})
                    </small>
                </div>
            </div>
        </>
    );
}
export default CartItem;