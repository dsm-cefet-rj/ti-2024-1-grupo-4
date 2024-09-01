import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserServer} from '../../redux/user/UserSlice';
import { toast } from 'react-toastify';

/**
 * @module admin/ClienteListar
 */

/**
 * Tipo da entidade 'cliente'
 * @typedef {Object} pedido
 * @property {string} id - id do cliente
 * @property {string} nome - nome do cliente
 * @property {string} email - email do cliente
/**
 * @function
 * @description Função para a impressão da informação cadastrada do cliente na loja
 * 
 * @param {user} user 
 * @returns 
 */

function ClienteListar({ user }) {
    const dispatch = useDispatch();


    const handleRemove = () => {
        const id = user.id;
        dispatch(deleteUserServer(id)).then((user)=>{
            if(user.payload){
                toast.info("Usuário deletado", {
                    position: "bottom-left",
                    className: "text-spicy-mix bg-banana-mania shadow",
                    autoClose: 2000,
                }); 
            }
        })
    }
    return (
        <>
            <div key={user.id} className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{user.nome}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button className="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#"+user.id} aria-expanded="false" aria-controls={user.id}>Mostrar mais</button>
                            <button type="button" className="btn btn-brick-red" onClick={handleRemove}>Deletar</button>            
                        </div>
                    </div>
                    <div className="collapse" id={user.id}>
                        <div className="card card-body">
                            <span>Nome do Cliente: {user.nome}</span>
                            <span>E-mail do Cliente: {user.username}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ClienteListar;