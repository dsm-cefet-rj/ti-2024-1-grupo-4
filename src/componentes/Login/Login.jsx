import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {

  return (
    <div className="wrapper">

      <div className = "classe-login">
        <h1>Login</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" placeholder="E-mail" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <div className ="container">
              <div className = "lembrar-login">
                <Form.Group className="mb-4 mt-3" controlId="formBasicCheckbox" id = "lembrar-login">
                  <Form.Check type="checkbox" />
                  <Form.Check.Label className="checkbox-label">Lembrar</Form.Check.Label>
                </Form.Group>
              </div>
              

            </div>
            <Button className = "custom-button" type="submit">
                Login
            </Button>
            
          </Form>  
        </div>
    </div>
    

  );
}

export default Login;