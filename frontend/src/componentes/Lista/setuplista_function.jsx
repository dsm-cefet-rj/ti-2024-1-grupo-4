import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'react-toastify';


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
import { fetchEntregaByPedido, updateEntregaServer } from '../../redux/entrega/entregaSlice.js';


function Lista(ped) {
  const dispatch = useDispatch();
  const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);
  const entrega = useSelector((rootReducer) => rootReducer.entregaSlice.entrega[ped.id]);

  useEffect(() => {
    if (!entrega || (status === 'not_loaded' || status === 'saved' || status === 'deleted')) {
      dispatch(fetchEntregaByPedido(ped.id));
    }
}, [status, dispatch, ped.id]);


  const cancelaPedido = async () => {
    if(entrega.status == "Pedido Cancelado"){
      toast.error("O pedido já foi cancelado", {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
        })
    }
    else if(entrega.status != "Avaliando Pedido"){
      toast.error("O pedido já foi aceito e não pode ser cancelado", {
        position: "bottom-left",
        className: "text-spicy-mix bg-banana-mania shadow",
        autoClose: 2000,
        })
    } else{
      try{
        await dispatch(updateEntregaServer({id: entrega.id, status: "Pedido Cancelado"})).unwrap()

        dispatch(fetchEntregaByPedido(ped.id));
      } catch(error){
        console.error(error)
      }
      
    }
}

  /**/
  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Pedido: {ped.id}</h3>
        <div className='d-flex justify-content-between align-items-center gap-3'>
          <h4>Status: <span className='text-neon-carrot'>{entrega?.status}</span></h4>
          <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+ped.id} aria-expanded="false" aria-controls={ped.id}>Mostrar mais</button>
        </div>
      </div>
      <div class="collapse" id={ped.id}>
        <div class="card-body">
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
          <h5 className='border-top border-tacao'> Informações de entrega:</h5>
          <div className='d-flex flex-column'>
            <div>
              <h5>Quem Pediu: </h5>
              <p>Nome: {ped.user.nome}</p>
              <p>Email: {ped.user.email}</p>
            </div>
          <div>
          <h5>Endereço para entrega:</h5>
          {entrega ? (
            <>
              <span>CEP: {entrega.endereco.CEP}</span>
              <br />
              <span>Local: {entrega.endereco.logradouro}, {entrega.endereco.numeroEndereco}</span>
              <br />
              {entrega.endereco.complemento ? (<span>Complemento: {entrega.endereco.complemento}</span>) : null}
              {entrega.instrucoes ? ( <p>Instruções: {entrega.instrucoes}</p>): null}
            </>
          ) : (
            <span>Carregando informações de entrega...</span>
          )}
          </div>
          </div>

        </div>
        <button type="button" className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow-sm" onClick = {cancelaPedido}>Cancelar Pedido</button>
      </div>
    </>

  );
}
export default Lista;
