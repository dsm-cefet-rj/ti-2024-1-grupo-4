import React, { useEffect, useState } from 'react';
import { addUserServer, emailExistServer, fetchUser } from '../../redux/user/UserSlice';
import { useDispatch, useSelector } from 'react-redux';


function Perfil_Usuario() {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const Nome = currentUser?.nome || null;
    const email = currentUser?.email || null;
    const senha = currentUser?.senha || null;
  return (
    <>
    <div>
        <h1>Perfil do Usuário</h1>
        <div class="collapse" id={currentUser.id}>
            <div class="card card-body">
              <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Produto"></input>
              <input type="number" className="form-control" id="preco" name="preco" value={formData.preco} onChange={handleChange} step="any" min="0.1" placeholder="Preço do Produto"></input>
              <textarea className="form-control" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="5" placeholder="Descrição do Produto"></textarea>
            </div>
        </div>
    </div>
    
    </>
  )
};
export default Perfil_Usuario;