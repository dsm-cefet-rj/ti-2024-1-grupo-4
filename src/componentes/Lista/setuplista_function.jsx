import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { fetchPedido } from '../../redux/listapedidos/ListaPedidoSlice.js';

import { useSelector, useDispatch } from 'react-redux';


function Lista(ped) {

  const dispatch = useDispatch();
  const status = useSelector((rootReducer) => rootReducer.pedidoSlice.status);


  const handleUpdate = () => {
    dispatch(updatePedidoServer(formData))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>

      <div class="card mb-3" style={{ maxWidth: '540px;' }}>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="..."></img>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <h5 className="card-title">{ped.status}</h5>
                <h5 className="card-text">{"#" + ped.id}</h5>
              </blockquote><br />
              <div className="card-text">
                <button type="button" className="btn btn-brick-red" onClick={handleUpdate}>Atualizar</button>
              </div>
              <div className="card-text-end">
                <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#" + ped.id} aria-expanded="false" aria-controls={ped.id}>Detalhes</button>
              </div>

              <div classname="collapse" id={"#" + ped.id}>
                <div class="card card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <span> {/*ped.produtos.map((produto) => <li>{produto.nome + produto.quantity}</li>)*/} </span>
                    <span> {/*ped.produtos.map((produto) => <li>{produto.quantity} </li>)*/} </span>
                  </div>
                  <h>
                  </h>
                  <div className="d-flex justify-content-between align-items-end">
                    <small className="text-muted">{/*ped.valortotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })*/}</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>





    </>

  );
}
export default Lista;
