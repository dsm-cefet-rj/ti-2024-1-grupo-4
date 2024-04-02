import React from 'react'
import Stepper from './Stepper'
const Controlestep = ({handleClick,currentStep,steps}) => {
  return (
    <div className='d-flex justify-content-evenly mt-4 mb-8 bg-equator'>
        {/* back button*/}
        <button 
        onClick={()=>handleClick()}
        className={'bg-banana-mania text-slate-400 uppercase py-2 px-4 rounded font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text=white transition duration-200 ease-in-out${currentStep == 1? "opacity-50 cursor-not-allowed":""}'}>
            Back
        </button>
        {/* next button*/}
        <button 
        onClick={()=>handleClick("next")}
        className='bg-banana-mania  text-black uppercase py-2 px-4
        rounded font-semibold cursos-pointer bg-equator hover-text-white transition duration-200 ease-in-out'
        >
          {currentStep==steps.length -1 ?"confirm":"Next"}
        </button>
    </div>
  )
}

export default Controlestep