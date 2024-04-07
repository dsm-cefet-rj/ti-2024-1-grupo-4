import React from 'react';


const cartItem = ( {product} ) => {
    const handleRemoveClick = () => {

    }

    const handleIncreaseClick = () => {
        
    }

    const handleDecreaseClick = () => {
        
    }
    
    return (
        <>
            <div className="card">
                <img className="card-img-top" src={product.imgUrl} alt=""></img>
                <div className="card-body d-flex flex-column justify-content-between align-items-stretch">
                    <h5 className="card-title">{product.nome}</h5>
                    <p className="card-text">{product.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">R${product.preco}</small>
                        <small>{product.quantity}</small>
                        <button type="button" className="btn btn-outline-tacao" onClick={handleRemoveClick}>Remover</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default cartItem;