import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { logarUser, fetchUser, selectUserById, fetchUserByEmail} from '../../redux/user/UserSlice';
import store from '../../redux/store'


function Login_page () {
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[errorMSG, setErrorMSG] = useState('');
  const[error,setError] = useState(false);
  const userState = useSelector((rootReducer) => rootReducer.userSlice)|| {};
  const history = useNavigate();
  const status = userState.status;
  const erro = userState.error;
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    if(status === 'not_loaded' || status === 'saved' || status === 'deleted' ){
      dispatch(fetchUser())
    } else if(status ==='failed'){
        setTimeout(()=>dispatch(fetchUser()))
    }
  }, [status,dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchUserByEmail({email,senha})).then((result) => {
      if(result.payload){
        console.log("logado", result.payload);
        console.log(location);
        alert('Usuário Logado!');
        if(location.pathname === '/login'){
          history('/');
        }
      }else{
        setError(true);
        setErrorMSG("E-mail ou senha inválidos!")
      }
    }).catch((err) => {
      console.log("Error fetching user: ", err)
    });
  }; 

  return (
    <>
        
        <div className="container" onSubmit = {handleLogin}>
          <div className="bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style={{ width: '30%', height: '500px' }}>
            <div className="form col">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill m-3" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>

              <h1>Login</h1>
              {error == true &&
                <div className='bg-brick-red m-1 p-1 text-banana-mania rounded-3'>{errorMSG}</div>
              }
              <form className="g-3 col">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="fulano@silva.com" value={email} onChange={e => setEmail(e.target.value)} required></input>
                </div>
                <div className="col">
                  <label className="senha">Senha</label>
                  <input type="password" className="form-control" id="inputPassword2" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required></input>
                </div>
                <div className=" div-botao col">
                  <button type="submit" className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow">Login</button>
                </div>
                <hr />
                <div>
                  <p>Não tem uma conta? <Link to="/Cadastro" className="class-registro">Registre-se</Link></p>
                </div>
              </form>

            </div>
          </div>
        </div>
    </>
    

  );
}

export default Login_page;
