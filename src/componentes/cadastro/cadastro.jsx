import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Cadastro() {
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
    <div className = "form-cadastro">
    <h2>Cadastro</h2>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Primeiro Nome</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Primeiro Nome"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Sobrenome"
          />
        </Form.Group>
        <h2>Endereço de Entrega</h2>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} md="8" controlId="validationCustom03">
          <Form.Label>Logradouro</Form.Label>
          <Form.Control type="text" placeholder="Ex: Rua, Avenida, etc." required />
          <Form.Control.Feedback type="invalid">
            Por favor coloque um Logradouro válido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Número</Form.Label>
          <Form.Control type="number" placeholder="Número" required />
          <Form.Control.Feedback type="invalid">
            Por favor coloque um número válido
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Aceitar termos e condições"
          feedback="Você tem que aceitar os termos do usuário antes de se cadastrar"
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Cadastre-se</Button>
    </Form>
    </div>
  );
}

export default Cadastro;