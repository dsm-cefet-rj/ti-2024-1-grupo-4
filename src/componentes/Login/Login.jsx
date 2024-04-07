import './login.scss';
import { Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import  jsonData from './users.json';
import Header from '../Header/Header';


function Login_page () {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[contas, setContas] = useState([]);

  useEffect(() => {
    setContas(jsonData);
  }, []);

  

  const handleLogin = () => {
    const foundUser = hand
    
    if (foundUser) {
      console.log('Object found:', foundUser);
    } else {
      console.log('Object not found.');
    }
  }; 

  return (
    <>
      <Header></Header>
    
    <div className="wrapper container-fluid">
      <div className = "classe-login">
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
            
            <div className = "botao-login">
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
    </>
    

  );
}

export default Login_page;
