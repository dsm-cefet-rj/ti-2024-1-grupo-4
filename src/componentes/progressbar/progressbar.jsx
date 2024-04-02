import React, { useState } from 'react'
import { UseContextProvider } from '../../context/StepperContext'
//import'./progress.css';


import Stepper from './Stepper'
import Controlestep from './Controlestep'
import Conta from './steps/Conta'
import Details from './steps/Details'
import Pagamento from './steps/Pagamento'
import Novossteps from './steps/novossteps'
import Final from './steps/Final'

const progressbar = () => {
  const[currentStep,setCurrentStep] = useState(1);
  const[userData, setUserData] = useState('');
  const[finalData,setFinalData] = useState([]);
  const steps = [
    "Account Information",
    "Personal Details",
    "Complete"
  ];
  const displayStep = (step)=>{
    switch (step) {
      case 1:
        return <Conta/>
      case 2:
        return <Details/>
      case 3:
        return <Pagamento/>
      case 4:
        return <Final/>
    
      default:
        break;
    }
  }
  const handleClick=(direction)=>{
      let newStep = currentStep;
      //checando se esta entre os passos 
      direction =="next"? newStep++:newStep--;
      newStep>0&& newStep <= steps.length && setCurrentStep(newStep);
  }
  return (
    <div className='d-flex align-items-center min-vh-100 bg-banana-mania'>
    <div className='container-fluid'>
        {/* stepper*/}
        <div className ="container-fluid align-items-center bg-equator shadow rounded">
        <Stepper
        steps = {steps}
        currentStep = {currentStep}
        />
        {/*Display componentes */}
        <div className='d-flex justify-content-center bg-equator'>
          <UseContextProvider value={{
            userData,
            setUserData,
            finalData,
            setFinalData
          }}>
            {displayStep(currentStep)}
          </UseContextProvider>
        </div>
        </div>
        

        {/*controle navega */}
        {currentStep != steps.length &&(
        <Controlestep
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
        )}
    </div>
    </div>
  )
}

export default progressbar