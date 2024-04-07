import React from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/cart/actions';



function Card(prod) {
    const dispatch = useDispatch();
    const handleProductClick = () => {
        dispatch(addProductToCart(prod));
    }

    return (
        <>
            <div className="card h-100">
                <img className="card-img-top" src={prod.imgUrl} alt=""></img>
                <div className="card-body d-flex flex-column justify-content-between align-items-stretch">
                    <h5 className="card-title">{prod.nome}</h5>
                    <p className="card-text">{prod.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">R${prod.preco}</small>
                        <button type="button" className="btn btn-outline-tacao" onClick={handleProductClick}>Adicionar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Card;