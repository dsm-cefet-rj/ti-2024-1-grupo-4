import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deletePedidoServer } from '../../redux/listapedidos/ListaPedidoSlice';


function PedidosListar({ pedido }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePedidoServer(pedido.id))
            .then((result) => {
                if (result.payload) {
                    toast.info("Pedido deletado!", {
                        position: "bottom-left",
                        className: "text-spicy-mix bg-banana-mania shadow",
                        autoClose: 2000,
                    });
                }
            })
            .catch((error) => {
                toast.error("Erro: " + error, {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 2000,
                });
            });
    };
    


    return (
        <>
            <div key={pedido.id} className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">Pedido id: {pedido.id}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+pedido.id} aria-expanded="false" aria-controls={pedido.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-brick-red" onClick = {handleDelete}>Deletar</button>            
                        </div>
                    </div>
                    <div class="collapse" id={pedido.id}>
                        <div class="card card-body">
                            <span>Status: #{pedido.status}</span>
                            <span>Nome do Cliente: </span>
                            <span>Endereço: </span>
                            <span>Valor total: R${pedido.valortotal} </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PedidosListar;