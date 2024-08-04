import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


/**
 * Imprime as informações de um pedido feito por um cliente na tela, mostra detalhes e permite a exclusão de pedidos
 * @component
 * @param {Object} ped - Objeto que contém as informações de pedido
 * @param {string} ped.id - id do pedido
 * @param {string} ped.status - O status do pedido
 * @param {Object} ped.endereco - Objeto que contém os detalhes do endreço do pedido
 * @param {string} ped.endereco.cep - O CEP do endereco do pedido
 * @param {string} ped.endereco.logradouro -  O logradouro do endereco do pedido
 * @param {string} ped.endereco.numEnd - O número do endereco do pedido
 * @param {string} ped.endereco.bairro - O bairro do endereco do pedido
 * @param {string} ped.endereco.CompEnd - Informações adicionais do endereco do pedido
 * @param {string} ped.endereco.instrucao_pedido - Instruções do pedido
 * @param {Array} ped.products - A lista de produtos contidos no pedido
 * @param {Object} ped.products[].nome - O nome dos produtos da lista
 * @param {number} ped.products[].preco - O preço dos produtos
 * @param {number} ped.products[].quantity - A quantidade dos produtos
 * @param {number} ped.valorTotal - O valor total dos produtos
 * @returns {JSX.Element} A lista de pedidos realizados
 */
import { deletePedidoServer } from '../../redux/listapedidos/ListaPedidoSlice.js';

import { useDispatch, useSelector } from 'react-redux';


function Lista(ped) {
  const dispatch = useDispatch();

  
  const handleDeletePedido = () => {
    dispatch(deletePedidoServer(ped.id));
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Pedido: {ped.id}</h3>
        <div className='d-flex justify-content-between align-items-center gap-3'>
          <h4>Status: <span className='text-neon-carrot'>{ped.status}</span></h4>
          <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+ped.id} aria-expanded="false" aria-controls={ped.id}>Mostrar mais</button>
        </div>
      </div>
      <div class="collapse" id={ped.id}>
        <div class="card-body">
          <div className='d-flex flex-column'>
            <h5>Endereço para entrega (CEP): <span>{ped.endereco.cep}</span></h5>
            <span>Local: {ped.endereco.logradouro}, {ped.endereco.numEnd}, {ped.endereco.bairro}</span>
            <span>Complemento: {ped.endereco.CompEnd}</span>
            <span>Instruções: {ped.endereco.instrucao_pedido}</span>
          </div>
          <h5 className='border-bottom border-tacao'>Produtos:</h5>
            {
              ped.products.map((produto) => (
                <>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center gap-3'>
                      <span>{produto.nome}</span>
                      <span>({produto.preco.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})})</span>
                    </div>
                    <span>x{produto.quantity}</span>
                  </div>
                </>
              ))
            }
          <h5 className='border-top border-tacao'>Total: {ped.valorTotal.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}</h5>
        </div>
      </div>
    </>

  );
}
export default Lista;
