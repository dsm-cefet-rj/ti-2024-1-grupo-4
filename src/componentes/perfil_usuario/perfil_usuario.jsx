import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchEndereco } from '../../redux/endereco/enderecoSlice';


function Perfil_Usuario() {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
  const userState = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const status = userState.status;
  const nome = currentUser?.nome || null;
  const email = currentUser?.email || null;
  const senha = currentUser?.senha || null;
  const id = currentUser?.id || null;

  console.log(status)

  useEffect(() => {
    if(status === 'not_loaded' || status === 'saved' || status === 'deleted' ){
      dispatch(fetchEndereco())
    } else if(status ==='failed'){
        setTimeout(()=>dispatch(fetchUser()))
    }
  }, [status,dispatch]);

  
  return (
    <>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "900px" }}>
        <h1>Perfil do Usuário</h1>
        <form action="Update User">
          <label htmlFor="nome" className='m-2'>Nome do Usuário</label>
          <input type="text" className="form-control" id="nome" name="nome" value={nome} placeholder="Nome do Cliente"></input>

          <label htmlFor="email" className='m-2'>E-mail do usuário:</label>
          <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Email do Cliente"></input>
          <button className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Informações</button>
        </form>
      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "900px" }}>
        <div className = "row">
          <h2>Endereço</h2>
        <form action="Update Endereço">
          <div className="col-md-4">
          <label className="form-label">CEP</label>
          <input type="text" className="form-control"></input>
        </div>
        <div className="col-md-4">
          <label className="form-label">Logradouro</label>
          <input type="text" className="form-control" placeholder="Ex: Rua, Avenida, etc." ></input>
        </div>
        <div className="col-6">
          <label className="form-label">Complemento</label>
          <input type="text" className="form-control" placeholder="Ex: Apto, Bloco, etc." ></input>
        </div>
        <div className="col-6">
          <label className="form-label">Número</label>
          <input type="number" className="form-control" ></input>
        </div>
        <button className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Endereço</button>
        </form>
        </div>
        
        
      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "900px" }}>
        <h2>Mudança de senha</h2>
         <form action="Update Senha">
          <label htmlFor="email" className='m-2'>Digite sua senha:</label>
          <input type="text" className="form-control" id="email" name="email" value="senha" placeholder="Email do Cliente"></input>
          <label htmlFor="email" className='m-2'>Digite a nova senha:</label>
          <input type="text" className="form-control" id="email" name="email" value="senha" placeholder="Email do Cliente"></input>
          <label htmlFor="email" className='m-2'>Repita a senha:</label>
          <input type="text" className="form-control" id="email" name="email" value="senha" placeholder="Email do Cliente"></input>
          <button className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Senha</button>
         </form>
      </div>

      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "900px" }}>
        <h2>Pedido</h2>
         
      </div>




    </>
  )
};
export default Perfil_Usuario;