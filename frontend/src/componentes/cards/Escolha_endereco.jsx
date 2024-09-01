import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @module perfil_usuario
 */
/**
 * Tipo da entidade 'endereco'
 * @typedef {Object} endereco
 * @property {string} id - id do endereco
 * @property {string} CEP - CEP do endereco cadastrado
 * @property {string} logradouro - logradouro do endereco cadastrado
 * @property {string} numero - numero do endereco cadastrado
 * @property {string} complemento - complemento do endereco cadastrado
 * @property {string} userKey - id do cliente que cadastrou o endereco
 */
/**
 * @function
 * @description Função que recebe um endereco e imprime as informações em formato de card
 * 
 * @param {endereco} endereco 
 * @returns {void} Está função não retorna valor
 */

function Escolha_Endereco({ endereco, enderecoSelecionado, onSelect }) {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};


    return (
        <>
            <div className="row d-flex">
                <div className="card w-100 col g-1 bg-banana-mania shadow-sm border-banana-mania" key = {endereco.id}>
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{endereco.logradouro}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button className="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#" + endereco.id} aria-expanded="false" aria-controls={endereco.id}>Mostrar mais</button>  
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="enderecoSelecionado"
                                    id={`endereco-${endereco.id}`}
                                    value={endereco.id}
                                    checked={enderecoSelecionado === endereco.id}
                                    onChange={() => onSelect(endereco.id)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="collapse" id={endereco.id}>
                        <div className="card card-body">
                        <p>CEP: {endereco.CEP}</p>
                        <p>Local: {endereco.logradouro}, {endereco.numeroEndereco}</p>
                        <p>Bairro: {endereco.bairro}</p>
                        {endereco.complemento ? (<p>Complemento: {endereco.complemento}</p>) : null}
                        </div>
                    </div>                
                </div>
            </div>
        </>
    );
}
export default Escolha_Endereco;