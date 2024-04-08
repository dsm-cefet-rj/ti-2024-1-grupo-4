import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import  jsonData from './users.json';
import Header from '../header/Header';
import Footer from '../Footer/Footer';


function Login_page () {
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[contas, setContas] = useState([]);

  useEffect(() => {
    setContas(jsonData);
  }, []);

  

  const handleLogin = () => {
    const foundUser = contas.find(contas.username === username && contas.password === password);
    
    if (foundUser) {
      console.log('Object found:', foundUser);
    } else {
      console.log('Object not found.');
    }
  }; 

  return (
    <>
          <Header></Header>
        
        <div className="container min-vw-100" style={{ height: '89vh' }}>
          <div className="classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style={{ width: '400px', height: '475px' }}>
            <div className="form col">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill m-3" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>

              <h1>Login</h1>
              <form className="g-3 col">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="fulano@silva.com" value={email} onChange={e => setEmail(e.target.value)} required></input>
                </div>
                <div className="col">
                  <label htmlFor="inputPassword2" className="senha">Senha</label>
                  <input type="password" className="form-control" id="inputPassword2" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required></input>
                </div>
                <div className=" div-botao col">
                  <button type="button" className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow" onClick={handleLogin}>Login</button>
                </div>
                <hr />
                <div>
                  <p>Não tem uma conta? <Link to="/Cadastro" className="class-registro">Registre-se</Link></p>
                </div>
              </form>

            </div>
          </div>
        </div>
      <Footer/>
    </>
    

  );
}

export default Login_page;
/*<div className="wrapper container-fluid h-100 align-items-center row justify-content-center bg-black">
      <div className = "classe-login h-100 bg-banana-mania text-center col-3 m-3 p-3 rounded-4">
        <div className = "icone-svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
      
        <h1>Login</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control className = "classe-input" type="email" placeholder="E-mail" value = {username}  onChange={e => setUsername(e.target.value)}/>
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control className = "classe-input" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            
            <div className = "botao-login m-3">
              <Button className = "classe-input custom-button bg-equator" type="button" onClick={handleLogin}>
                Login
            </Button> 
            </div>
            <hr />
            <div>
              <p>Não tem uma conta? <Link to = "/Cadastro" className = "class-registro">Registre-se</Link></p>
            </div>
            
            
          </Form>  
        </div>
    </div>
*/