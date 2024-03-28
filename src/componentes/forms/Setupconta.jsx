import React, { Component } from 'react'

export class Setupconta extends Component {
    continue = e =>{
        e.preventDefault();
        this.props.nextStep();
    };
  render() {
    const{values,inputChange} = this.props;
    return (
      <div className='form-container'>

      </div>
    )
  }
}

export default Setupconta