import React, { Component } from 'react'
import Progressbar from './progress_bar.jsx'
import './botao.scss'



export class Setupconta extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    };
  render() {
    const { values, inputChange } = this.props;
    return (
      <>
      <div className='position-relative pt-2'>
       <Progressbar/>
       </div>
        <div className="container-fluid position-sticky">
          <div className="bg-equator justify-content-center align-items-center m-1">
            <div className="icone-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
          </div>
        </div>
        <div className='form-group form-control-sm'>
          <div class="form-floating mb-2">
            <input type="text" class="form-control"  name='user' onChange={inputChange('user')} value={values.user} id="floatingInput" placeholder="name@example.com"/>
              <label for="floatingInput">Usuário</label>
          </div>
          <div class="form-floating mt-3">
            <input type="password" class="form-control " id="floatingPassword" placeholder="Senha" name='password' onChange={inputChange('password')} value={values.password} />
            <label for="floatingPassword">Senha</label>
          </div>
        </div>
        <br />
        <div className='text-right'>
          <button type="button" className="btn btn-padrao"onClick={this.continue}>Login</button>
        </div>
      </>
    )
  }
}

export default Setupconta