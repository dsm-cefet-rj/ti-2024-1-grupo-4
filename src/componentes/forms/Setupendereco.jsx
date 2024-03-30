import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class Setupendereco extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    };
    back = e =>{
        e.preventDefault();
        this.props.prevStep();
    };
  render() {
    const{values,inputChange} = this.props;
    return (
      <>
      <div className='form-container'>
        <div className='form-group'>
            <label htmlFor='cep'>Cep</label>
            <input type='text' className='form-control' name='cep' onChange={inputChange('cep')} value={values.cep}/>
        </div>
        <div className='form-group'>
            <label htmlFor='logradouro'>Logradouro</label>
            <input type='text' className='form-control' name='logradouro' onChange={inputChange('logradouro')} value={values.logradouro}/>
        </div>
        <div className='form-group'>
            <label htmlFor='numEnd'>Número</label>
            <input type='text' className='form-control' name='numEnd' onChange={inputChange('numEnd')} value={values.numEnd}/>
        </div>
        <div className='form-group'>
            <label htmlFor='CompEnd'>Complemento</label>
            <input type='text' className='form-control' name='CompEnd' onChange={inputChange('CompEnd')} value={values.CompEnd}/>
        </div>
      </div>
    <br/>
            <div className='row'>
                <div className='col-6'>
                    <div className='text-right'>
                        <Button className='btn custom-button bg-equator' onClick={this.back}>Anterior</Button>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='text-right'>
                        <Button className='btn custom-button bg-equator' onClick={this.continue}>Próximo</Button>
                    </div>
                </div>

            </div>
        </>
    )
  }
}

export default Setupendereco