import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProdutoServer } from '../../redux/produtos/ProdutosSlice';

/**
 * @module admin/ProdutoItemDelete
 */

/**
 * Tipo da entidade 'produto'
 * @typedef {Object} produto
 * @property {string} id - id do produto
 * @property {string} nome - nome do produto
 * @property {string} descricao - descrição do produto
 * @property {number} preco - preço do produto
 */
/**
 * @function
 * @description Função que recebe um objeto produto, imprime o produto e suas informações e permite sua remoção
 * 
 * @param {produto} produto 
 * @returns {void} Está função não retorna valor
 */
function ProdutoItemDelete({ produto }) {
    const dispatch = useDispatch();
    const handleRemove = () => {
        dispatch(deleteProdutoServer(produto));
    }

    return (
        <>
            <div key={produto.id} className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{produto.nome}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button className="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+produto.id} aria-expanded="false" aria-controls={produto.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-brick-red" onClick={handleRemove}>Deletar</button>                  
                        </div>
                    </div>
                    <div className="collapse" id={produto.id}>
                        <div className="card card-body">
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