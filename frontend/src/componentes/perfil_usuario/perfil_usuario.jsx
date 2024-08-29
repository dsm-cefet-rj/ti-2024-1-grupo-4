import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEnderecoServer, fetchEnderecoByUser, updateEnderecoServer } from '../../redux/endereco/enderecoSlice';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { updateUserServer, deleteUserServer, changeSenhaServer } from '../../redux/user/UserSlice';
import { toast } from 'react-toastify';
import Endereco_Card from './Endereco_Card';
import { useNavigate } from 'react-router-dom';

/**
 * Página do usuário para administrar as informações do cadastro do usuário
 * @component
 */

function Perfil_Usuario() {
  const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
  const enderecoState = useSelector((rootReducer) => rootReducer.enderecoSlice) || {};
  const { enderecos } = useSelector((rootReducer) => rootReducer.enderecoSlice) || {};
  console.log(enderecos)
  const status = enderecoState.status;
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (status === 'not_loaded' || status === 'saved' || status === 'deleted') {
      dispatch(fetchEnderecoByUser(currentUser))
    } else if (status === 'failed') {
      setTimeout(() => dispatch(fetchEnderecoByUser(currentUser)))
    }
  }, [status, currentUser, dispatch]);

  /**
   * Esquemas de validação das informações do usuário
   */
  const userSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email().required('E-mail é obrigatório'),
  });

  const enderecoSchema = yup.object().shape({
    CEP: yup.string().required('CEP é obrigatório'),
    logradouro: yup.string().required('Logradouro é obrigatório'),
    complemento: yup.string(),
    numero: yup.number().positive().required('Número é obrigatório')
  });

  const senhaSchema = yup.object().shape({
    novaSenha: yup.string().required('A Nova senha deve ser preenchida').min(5, 'A quantidade mínima é de 5 dígitos'),
    repSenha: yup.string().oneOf([yup.ref('novaSenha'), null], 'As senhas devem ser iguais').required(),
    SenhaAtual: yup.string().required('A Senha Atual deve ser preenchida')
  });


  const { register: registerUser, handleSubmit: handleSubmitUser, formState: { errors: userErrors } } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { register: registerEndereco, handleSubmit: handleSubmitEndereco, formState: { errors: enderecoErrors } } = useForm({
    resolver: yupResolver(enderecoSchema),
  });
  const { register: registerSenha, handleSubmit: handleSubmitSenha, formState: { errors: senhaErrors } } = useForm({
    resolver: yupResolver(senhaSchema),
  });

  /**
   * Formulário que atualiza as informações do usuário
   * @param {Object} data -  Informações do formulário do usuário 
   */
  const userUpdate = (data) => {
    const {nome, email} = data;
    userSchema.validate(data).then(()=>{
      dispatch(updateUserServer({nome: nome, username: email})).then((payload)=>{
        console.log(payload);
      })
    })
  }
  const createEndereco = (data) => {
    const { CEP, logradouro, numero, complemento } = data;
    const userKey = currentUser;
    enderecoSchema.validate(data).then((validData) => {
      dispatch(addEnderecoServer({ CEP, logradouro, numeroEndereco:numero, complemento, userKey })).then((endereco) => {
        if (endereco.payload) {
          toast.info("Endereço adicionado", {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
          });
        }

      }).catch((error) => {
        toast.error("Erro: " + error, {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      })

    })
      .catch((error) => {
        toast.error("Erro: " + error, {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      })
  }

  /**
   * Dashboard que atualiza, deleta e adiciona as informações do endereco do usuário
   * @param {Object} data -  Informações do formulário do endereco 
   */
  const enderecoUpdate = (data) => {
    const { CEP, logradouro, numero, complemento } = data;
    const userKey = currentUser;
    enderecoSchema.validate(data).then((validData) => {
      dispatch(updateEnderecoServer({ CEP, logradouro, numero, complemento, userKey })).then((endereco) => {
        if (endereco.payload) {
          toast.info("Endereço alterado", {
            position: "bottom-left",
            className: "text-spicy-mix bg-banana-mania shadow",
            autoClose: 2000,
          });
        }
      }).catch((error) => {
        toast.error("Erro: " + error, {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      })

    })
      .catch((error) => {
        toast.error("Erro: " + error, {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      })
  }

  /**
   * Formulário que atualiza as informações de senha do usuário
   * @param {Object} data -  dados do formulário de atualização de senha 
   */
  const passUpdate = (data) => {
    const {novaSenha, repSenha, SenhaAtual} = data;
    senhaSchema.validate(data).then(() => {
      dispatch(changeSenhaServer({SenhaAtual: SenhaAtual, SenhaNova: novaSenha})).then((payload) =>
      {
        console.log(payload);
      })
    })
  }

  /**
   * Deleta as informações do usuário
   */
  const handleRemove = () => {
    const id = currentUser;
    dispatch(deleteUserServer(id)).then((resposta) => {
      if (resposta.payload) {
        history('/');
        toast.info("Conta deletada", {
          position: "bottom-left",
          className: "text-spicy-mix bg-banana-mania shadow",
          autoClose: 2000,
        });
      }
    })
  }







  return (
    <>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "600px" }}>
        <h1>Perfil do Usuário</h1>
        <form onSubmit={handleSubmitUser(userUpdate)}>
          <label htmlFor="nome" className='m-2'>Nome do Usuário:</label>
          <input type="text" id='nome' className="form-control" {...registerUser("nome")}  placeholder="Nome do Cliente"></input>
          {userErrors && userErrors.nome && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{userErrors.nome.message}</p>}

          <label htmlFor="email" className='m-2'>E-mail do usuário:</label>
          <input type="text" className="form-control" {...registerUser("email")}  placeholder="Email do Cliente"></input>
          {userErrors && userErrors.email && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{userErrors.email.message}</p>}
          <button type="submit" id='email' className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Informações</button>

        </form>
      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "600px" }}>
        <h2>Endereco</h2>
        {enderecos ? <>
          {Object.values(enderecos).map((endereco) => (
            <Endereco_Card key={endereco.id} endereco={endereco} />
          ))}
        </> : null}

        <div className="modal fade" id="criarProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="criarProdutoLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="criarProdutoLabel">Adicionar Endereço</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

                <form onSubmit={handleSubmitEndereco(createEndereco)}>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor='CEP'>CEP:</label>
                    <input type="text" id='CEP' className="form-control" {...registerEndereco("CEP")}></input>
                    {enderecoErrors.endereco?.CEP && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.CEP.message}</p>}
                  </div>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor='logradouro'>Logradouro:</label>
                    <input type="text" id='logradouro' className="form-control" placeholder="Ex: Rua, Avenida, etc." {...registerEndereco("logradouro")}></input>
                    {enderecoErrors.endereco?.logradouro && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.logradouro.message}</p>}
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor='complemento'>Complemento:</label>
                    <input type="text" id='complemento' className="form-control" placeholder="Ex: Apto, Bloco, etc."  {...registerEndereco("complemento")}></input>
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor='numero'>Número:</label>
                    <input type="number" id='numero' className="form-control" {...registerEndereco("numero")}></input>
                    {enderecoErrors.endereco?.numero && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{enderecoErrors.numero.message}</p>}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-brick-red" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-verde-certo">Adicionar Endereco</button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>

        <button type="button" data-bs-toggle="modal" data-bs-target="#criarProduto"
          className="col-sm botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50 "
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
          </svg></button>


      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "600px" }}>
        <h2>Mudança de senha</h2>
        <form onSubmit={handleSubmitSenha(passUpdate)}>

          <label htmlFor='novaSenha' className='m-2'>Digite a sua senha:</label>
          <input type="password" id='novaSenha' className="form-control" {...registerSenha("SenhaAtual")}></input>
          {senhaErrors && senhaErrors.SenhaAtual && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{senhaErrors.SenhaAtual.message}</p>}

          <label htmlFor='novaSenha' className='m-2'>Digite a nova senha:</label>
          <input type="password" id='novaSenha' className="form-control" {...registerSenha("novaSenha")}></input>
          {senhaErrors && senhaErrors.novaSenha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{senhaErrors.novaSenha.message}</p>}

          <label htmlFor='repSenha' className='m-2'>Repita a senha:</label>
          <input type="password" id='repSenha' className="form-control"  {...registerSenha("repSenha")}></input>
          {senhaErrors && senhaErrors.repSenha && <p className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{senhaErrors.repSenha.message}</p>}
          <button type='submit' className='m-3 botao btn btn-primary bg-tacao btn-tacao border-tacao shadow-sm w-50'>Atualizar Senha</button>


        </form>
      </div>
      <div className="bg-banana-mania container-fluid rounded-4 shadow text-center mt-3" style={{ width: "600px" }}>
        <h2>Deletar Usuário</h2>
        <button type="button" className="btn btn-brick-red m-3" onClick={handleRemove}>Deletar</button>

      </div>




    </>
  )
};
export default Perfil_Usuario;