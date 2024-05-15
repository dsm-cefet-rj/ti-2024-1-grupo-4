import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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
