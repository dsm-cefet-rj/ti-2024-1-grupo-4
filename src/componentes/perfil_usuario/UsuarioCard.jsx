
import React, { useEffect, useState } from 'react';
import { addUserServer, emailExistServer, fetchUser } from '../../redux/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';


function Usuario_Card({ user }) {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const Nome = currentUser?.nome || null;
    const email = currentUser?.email || null;
    const senha = currentUser?.senha || null;
    return (
        <>
            <div key="item.id" className="row d-flex">
                <div className="card w-100 col g-1">
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title">{user.nome}</h5>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button class="btn btn-tacao" type="button" data-bs-toggle="collapse" data-bs-target={"#" + user.id} aria-expanded="false" aria-controls={user.id}>Mostrar mais</button>
                        </div>
                    </div>
                    <div class="collapse" id={user.id}>
                        <div class="card card-body">
                            <input type="text" className="form-control" id="nome" name="nome" value={formData.nome}  placeholder="Nome do Produto"></input>
                            <input type="number" className="form-control" id="preco" name="preco" value={formData.preco} step="any" min="0.1" placeholder="Preço do Produto"></input>
                            <textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} rows="5" placeholder="Descrição do Produto"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Usuario_Card;