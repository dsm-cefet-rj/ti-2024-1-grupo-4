import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { deletePedidoServer } from '../../redux/listapedidos/ListaPedidoSlice.js';

import { useDispatch, useSelector } from 'react-redux';


function Lista(ped) {
  const dispatch = useDispatch();
  const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);

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
        <div class="card-body align-items-center">
            <span>Teste</span>
        </div>
      </div>
    </>

  );
}
export default Lista;
