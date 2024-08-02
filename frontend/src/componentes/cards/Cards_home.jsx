import React from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/cart/CartSlicer.js'; //cartSlicer

/**
 * @module cards
 */
/**
 * Tipo da entidade 'prod'
 * @typedef {Object} prod
 * @property {string} imgUrl - url da imagem do produto
 * @property {string} nome - nome do produto
 * @property {string} descricao - descrição do produto
 * @property {number} preco - preço do produto
 */
/**
 * @function
 * @description Função que recebe um objeto produto e imprime suas informações em formato de um cartão
 * 
 * @param {prod} prod 
 * @returns {void} Está função não retorna valor
 */

function Card(prod) {
    const dispatch = useDispatch();
    const handleProductClick = () => {
        dispatch(addProductToCart(prod));
    }
    const estilo = {
        Width: '250px',
        Height:'250px'
    }

    return (
        <>
            <div className="card h-100 border-banana-mania shadow-sm" style={estilo}>
                <img className="card-img-top" src={prod.imgUrl}  style = {estilo}  width={350} height={250} alt=""></img>
                <div className="card-body d-flex flex-column justify-content-between align-items-stretch">
                    <h5 className="card-title">{prod.nome}</h5>
                    <p className="card-text">{prod.descricao}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{prod.preco.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}</small>
                        <button type="button" className="btn btn-outline-tacao" onClick={handleProductClick}>Adicionar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Card;