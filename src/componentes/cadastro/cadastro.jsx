import './cadastro.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Register_page() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className = "container">
      <div className = "form-cadastro">

      
      <h2>Cadastro</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Primeiro Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Primeiro Nome"
              className = "button-register"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Sobrenome"
              className = "button-register"
            />
          </Form.Group>
          
        </Row>
        <Row className="mb-4">
          <h4>Endereço de Entrega</h4>
          <Form.Group as={Col} md="8" controlId="validationCustom03">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder="Ex: Rua, Avenida, etc." required />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Número</Form.Label>
            <Form.Control className = "button-register" type="number" placeholder="Número" required />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="7" controlId="validationCustom03">
            <Form.Label>Cidade</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder= "Cidade" required />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Bairro</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder="Bairro" required />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="10" controlId="validationCustom03">
            <Form.Label>Complemento</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder= "Ex: Apartamento, bloco, etc." />
          </Form.Group>
        </Row>
        <div className = "div-botao-register">
          <Button type="submit" className = "button-register botao bg-equator">Cadastre-se</Button>
        </div>
        
      </Form>
      </div>
    </div>
  );
}

export default Register_page;