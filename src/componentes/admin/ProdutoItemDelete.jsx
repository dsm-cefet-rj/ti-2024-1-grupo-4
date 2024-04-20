import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProdutoServer } from '../../redux/produtos/ProdutosSlice';

function ProdutoItemDelete({ produto }) {
    const dispatch = useDispatch();
    const handleRemove = () => {
        dispatch(deleteProdutoServer(produto));
    }

    return (
        <>
            <div key="item.id" className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{produto.nome}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+produto.id} aria-expanded="false" aria-controls={produto.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-brick-red" onClick={handleRemove}>Deletar</button>                  
                        </div>
                    </div>
                    <div class="collapse" id={produto.id}>
                        <div class="card card-body">
                            <span>Preço: {produto.preco.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}</span>
                            <span>Descrição: {produto.descricao}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProdutoItemDelete;