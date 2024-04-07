import './cadastro.css';
import { useState } from 'react';
import Header from '../header/Header';

function Register_page() {
  const[validated, setValidated] = useState(false);
  const[senha, setSenha] = useState('');
  const[email, setEmail] = useState('');
  const[nome, setNome] = useState('');
  const[repSenha, setRepSenha] = useState('');
  const[logradouro, setLogradouro] = useState('');
  const[numero, setNumero] = useState('');
  const[cidade, setCidade] = useState('');
  const[bairro, setBairro] = useState('');
  const[complemento, setComplemento] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  

    setValidated(true);
  };

  return (
    <>

      
      <Header/>
      <div className='container'>

      <div className="container bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style={{ width: '60%', height: '650px' }}>


          <h2>Cadastro</h2>
          <form class="row g-3 col">
            <div class="col-md-6">
              <label htmlFor="inputEmail4" class="form-label" value = {email} onChange={e => setEmail(e.target.value)}>Email</label>
              <input type="email" class="form-control"></input>
            </div>
            <div class="col-md-6">
              <label htmlFor="inputEmail4" class="form-label" value = {nome} onChange={e => setNome(e.target.value)}>Nome</label>
              <input type="email" class="form-control"></input>
            </div>
            <div class="col-md-6">
              <label htmlFor="inputPassword4" class="form-label">Senha</label>
              <input type="password" class="form-control" value={senha} onChange={e => setSenha(e.target.value)} required></input>
            </div>
            <div class="col-md-6">
              <label htmlFor="inputPassword4" class="form-label">Repita a Senha</label>
              <input type="password" class="form-control" value = {repSenha} onChange={e => setRepSenha(e.target.value)} required></input>
            </div>
            <h2>Endereço (Opcional)</h2>
            <div class="col-12">
              <label htmlFor="inputAddress" class="form-label">Logradouro</label>
              <input type="text" class="form-control" placeholder="Ex: Rua, Avenida, etc." value = {logradouro} onChange={e => setLogradouro(e.target.value)}></input>
            </div>
            <div class="col-6">
              <label htmlFor="inputAddress2" class="form-label">Complemento</label>
              <input type="text" class="form-control" placeholder="Ex: Apto, Bloco, etc." value = {complemento} onChange={e => setComplemento(e.target.value)}></input>
            </div>
            <div class="col-6">
              <label htmlFor="inputAddress2" class="form-label">Número</label>
              <input type="number" class="form-control" value = {numero} onChange={e => setNumero(e.target.value)}></input>
            </div>

            <div class="col-md-6">
              <label htmlFor="inputCity" class="form-label">Cidade</label>
              <input type="text" class="form-control" value = {cidade} onChange={e => setCidade(e.target.value)}></input>
            </div>
            <div class="col-md-6">
              <label htmlFor="inputState" class="form-label">Bairro</label>
              <input type="text" class="form-control" value = {bairro} onChange={e => setBairro(e.target.value)}></input>
            </div>
            <div class="col-12">
              <button type="submit" class="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50">Cadastre-se</button>
            </div>
          </form>

        </div>
        </div>
    </>
  );
}
/*<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Nome e Sobrenome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Primeiro Nome"
              className = "button-register"
              value = {nome}
              onChange={e => setNome(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="E-mail"
              className = "button-register"
              value = {email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          
        </Row>
        <Row>
        <Form.Group as = {Col} md = "6" className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control className = "classe-input" type="password" placeholder="Senha" value = {senha} onChange={e => setSenha(e.target.value)} required/>
            </Form.Group>
            <Form.Group as = {Col} md = "6" className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repita a Senha</Form.Label>
              <Form.Control className = "classe-input" type="password" placeholder="Senha" value = {repSenha} onChange={e => setRepSenha(e.target.value)} required/>
            </Form.Group>
        </Row>
        <Row className="mb-4">
          <h4>Endereço de Entrega (Opcional)</h4>
          <Form.Group as={Col} md="8" controlId="validationCustom03">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder="Ex: Rua, Avenida, etc." value = {logradouro} onChange={e => setLogradouro(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Número</Form.Label>
            <Form.Control className = "button-register" type="number" placeholder="Número" value = {numero} onChange={e => setNumero(e.target.value)}/>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="7" controlId="validationCustom03">
            <Form.Label>Cidade</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder= "Cidade"  value = {cidade} onChange={e => setCidade(e.target.value)}/>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Bairro</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder="Bairro" value = {bairro} onChange={e => setBairro(e.target.value)}/>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="10" controlId="validationCustom03">
            <Form.Label>Complemento</Form.Label>
            <Form.Control className = "button-register" type="text" placeholder= "Ex: Apartamento, bloco, etc." value = {complemento} onChange={e => setComplemento(e.target.value)}/>
          </Form.Group>
        </Row>
        <div className = "div-botao-register">
          <Button type="button" className = "button-register botao bg-equator" onClick = {handleSubmit}>Cadastre-se</Button>
        </div>
        
      </Form>*/

export default Register_page;