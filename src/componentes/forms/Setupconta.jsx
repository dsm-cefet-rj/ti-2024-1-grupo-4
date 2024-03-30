import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Login from '../Login/Login'

export class Setupconta extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    };
  render() {
    const{values,inputChange} = this.props;
    return (
      <>
        <Login></Login>
        <div className='form-container'>
          <div className='form-group'>
            <label htmlFor='user'>Usuário</label>
            <input type='text' className='form-control' name='user' onChange={inputChange('user')} value={values.user} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Senha</label>
            <input type='text' className='form-control' name='password' onChange={inputChange('password')} value={values.password} />
          </div>
        </div>
        <br />
        <div className='text-right'>
          <Button className='btn custom-button bg-equator' onClick={this.continue}>Próximo</Button>
        </div>
      </>
    )
  }
}

export default Setupconta