import './cadastro.css';
import { useState } from 'react';

function Register_page() {
  const[validated, setValidated] = useState(false);
  const[senha, setSenha] = useState('');
  const[email, setEmail] = useState('');
  const[nome, setNome] = useState('');
  const[repSenha, setRepSenha] = useState('');
  const[logradouro, setLogradouro] = useState('');
  const[numero, setNumero] = useState('');
  const[CEP, setCEP] = useState('');
  const[complemento, setComplemento] = useState('');
  const[repSenhaError, setRepSenhaError] = useState(false);


  const handleSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if(senha !== repSenha){
      setRepSenhaError(true);
    }
  

    setValidated(true);
  };

  return (
    <>

      
      <div className='container'>

      <div className="bg-banana-mania row classe-login bg-banana-mania text-center m-5 p-3 rounded-4 shadow-lg" style={{ width: '60%', height: '600px' }}>


          <h2>Cadastro</h2>
          <form className="row g-3 col" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label" >Email</label>
              <input type="email" className="form-control" placeholder = "fulano@silva.com" value = {email} onChange={e => setEmail(e.target.value)} required></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label" >Nome</label>
              <input type="text" className="form-control" placeholder = "fulano da silva" value = {nome} onChange={e => setNome(e.target.value)} required></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">Senha</label>
              <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required></input>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">Repita a Senha</label>
              <input type="password" className={`form-control ${repSenhaError ? 'is-invalid' : ''}`} value = {repSenha} onChange={e => setRepSenha(e.target.value)} required></input>
            </div>
            {repSenhaError && (
              <div className="invalid-feedback">
                As senhas devem ser iguais
              </div>
            )}
            <h2>Endereço (Opcional)</h2>
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">CEP</label>
              <input type="text" className="form-control" value = {CEP} onChange={e => setCEP(e.target.value)}></input>
            </div>
            <div className="col-8">
              <label htmlFor="inputAddress" className="form-label">Logradouro</label>
              <input type="text" className="form-control" placeholder="Ex: Rua, Avenida, etc." value = {logradouro} onChange={e => setLogradouro(e.target.value)}></input>
            </div>
            <div className="col-6">
              <label htmlFor="inputAddress2" className="form-label">Complemento</label>
              <input type="text" className="form-control" placeholder="Ex: Apto, Bloco, etc." value = {complemento} onChange={e => setComplemento(e.target.value)}></input>
            </div>
            <div className="col-6">
              <label htmlFor="inputAddress2" className="form-label">Número</label>
              <input type="number" className="form-control" value = {numero} onChange={e => setNumero(Math.max(0,e.target.value))}></input>
            </div>

            
            <div className="col-12">
              <button type="submit" className="botao btn btn-primary m-3 bg-tacao btn-tacao border-tacao shadow w-50">Cadastre-se</button>
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