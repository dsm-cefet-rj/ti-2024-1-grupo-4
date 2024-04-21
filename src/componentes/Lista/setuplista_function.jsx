import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { fetchProduto } from '../../redux/produtos/ProdutosSlice.js';

import { useDispatch } from 'react-redux';


function Lista(ped) {

    const dispatch = useDispatch();
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
            
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                         <img src="..." class="img-fluid rounded-start" alt="..."></img>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                              <h5 className="card-title">{ped.status}</h5>
                              <h5 className="card-text">{"#"+ped.id}</h5>
                            </blockquote><br />
                              <div className="card-text">
                                <button type="button" className="btn btn-brick-red" onClick={handleUpdate}>Atualizar</button>
                              </div>
                              <div className="card-text-end">
                                <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+ped.id} aria-expanded="false" aria-controls={ped.id}>Detalhes</button>
                              </div>

                              <div classname="collapse" id={"#"+ped.id}>
                                <div class="card card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                     <span> {ped.produtos.map( (produto) => <li>{produto.nome+produto.quantity}</li>)} </span>
                                     <span> {ped.produtos.map( (produto) => <li>{produto.quantity} </li>)} </span>
                                    </div>
                                    <h> 
                                    </h>
                                    <div className="d-flex justify-content-between align-items-end">
                                     <small className="text-muted">{ped.valortotal.toLocaleString('pt-br',{style: 'currency', currency:'BRL'})}</small>
                                    </div>
                                </div>
                              </div>
                              
                        </div>
                      </div>
                    </div>
                </div>



           
        
        </>
        

        //<div class="collapse" id={pedido.id}>
            //<div class="card card-body">
            //<input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Produto">
                //<input type="number" className="form-control" id="preco" name="preco" value={formData.preco} onChange={handleChange} step="any" min="0.1" placeholder="Preço do Produto">
                //<textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="5" placeholder="Descrição do Produto"></textarea>
                //</input>
            //</input>

            //</div>
        //</div>
    );
}
export default Lista;

/*function Anotacao(){

                              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                </div>



           <h5 className="card-title">{ped.status}</h5>
           <p className="card-text">{"#"+ped.id}</p>      
           <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+ped.id} aria-expanded="false" aria-controls={ped.id}>Detalhes</button>
           <button type="button" className="btn btn-brick-red" onClick={handleUpdate}>Atualizar</button>

        <div className="collapse" id={"#"+ped.id}>
            <h2>{ped.progresso}
            
                <span> {ped.produtos.map( (produto) => <li>{produto.nome+produto.quantity}</li>)} </span>
                <span> {ped.produtos.map( (produto) => <li>{produto.quantity} </li>)} </span>
                <h>{ped.valortotal}
                </h>
            </h2>
        </div>
        </>
}*/