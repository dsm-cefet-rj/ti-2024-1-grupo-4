import React, { useContext } from 'react';
import {CarrinhoContext} from '../../context/CarrinhoContext.jsx';

function Card(prod) {
    const {addToCarrinho, itemsCarrinho, removeFromCarrinho} = useContext(CarrinhoContext);
    const qtdeItemsCarrinho = itemsCarrinho[prod.id];

    return (
        <>
            <div className="card h-100">
                <img className="card-img-top" src={prod.imgUrl} alt=""></img>
                <div className="card-body d-flex flex-column justify-content-between align-items-stretch">
                    <h5 className="card-title">{prod.nome}</h5>
                    <p className="card-text">{prod.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">R${prod.preco}</small>
                        {qtdeItemsCarrinho <= 0 ? ( /*Notação merda 2*/
                            <button type="button" className="btn btn-outline-tacao" onClick={() => addToCarrinho(prod.id)}>Adicionar</button>
                        ) : 
                            <div className="d-flex align-items-center flex-column g-1">
                                <div className="d-flex align-items-center justify-content-between gap-3">
                                    <span className="fs-6 text-muted">
                                        {qtdeItemsCarrinho > 0 ? (
                                            <div>R${(qtdeItemsCarrinho * prod.preco).toFixed(2)}</div>
                                        ) : 
                                        <span></span>
                                        }
                                    </span>
                                    <button type="button" className="btn btn-tacao" onClick={() => removeFromCarrinho(prod.id)}>-</button>
                                    <span className="fs-5">{qtdeItemsCarrinho}</span>
                                    <button type="button" className="btn btn-tacao" onClick={() => addToCarrinho(prod.id)}>+</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default Card;