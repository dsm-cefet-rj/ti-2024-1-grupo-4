import React from 'react';
import { useDispatch } from 'react-redux';

function ProdutoItem(prod) {
    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex justify-content-between">
                    <h5 className="card-title">{prod.nome}</h5>
                    <div className="d-flex justify-content-btween align-items-center">
                        <button type="button" className="btn btn-tacao" data-bs-toggle="modal" data-bs-dissmis="modal" data-bs-target="#atualizar/deletarProduto">Info</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProdutoItem;