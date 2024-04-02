import React,{useEffect,useState,useRef} from 'react'

const Stepper = ({steps,currentStep}) => {
  const[newStep,setNewStep] = useState([]);
  const stepRef = useRef;
  const updateStep = (stepNumber, steps)=>{
    const newSteps = [...steps]
    let count =0;

    while (count < newSteps.length) {
      //step atual
      if (count == stepNumber) {
        newSteps[count] = {
        ...newSteps[count],
        highlighted: true,
        selected: true,
        completed: true,
        };
      count++;
      }
      //steps completo
      else if(count < stepNumber){
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
          };
        count++;
      }
      //steps faltantes
      else{
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
          };
        count++;
      }
    }
    //
    return newSteps;
  };

  useEffect(()=>{
    //CRIAÇÃO DE OBJETO
    const stepsState = steps.map((step,index)=>
      Object.assign({},{
        description: step,
        completed:false,
        heiglighted: index == 0 ? true:false,
        selected: index==0? true:false,
      })
    )
      stepRef.current = stepsState;
      const current = updateStep(currentStep -1,stepRef.current);
      setNewStep(current);

  }, [steps, currentStep]);
 
  const displaySteps = newStep.map((step, index) => {
    return (
    <div key ={index} className= { index != newStep
    .length-1 ?'w-full d-flex items-center':"d-flex items-center"}>
      <div className='relative flex items-center'>
      {/*const temp1 = {step.highlighted ? "text-gray-900":"text-gray-400"};*/}
        <div className='temp1'>
        <div className={'rounded-circle border w-25 p-10'} >
          
          {/*'rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3${step.selected ? "bg-green-600 text-white font-bold border border-green-600":""}' */}
          {/* Display n */}
          {step.completed?(<span className='text-white font-bold text-xl'>{/*&#10003*/}</span>):(index+1)}
        </div>
        </div>
        <div className={'absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase '}>
        {/*${step.highlighted ? "text-gray-900:"text-gray-400"} */}
        {/* Display  descrip*/}
          {step.description}
        </div>
        {/*const temp2 = {step.completed ? "border-green-600":"border-gray-300"};*/}
        <div className='temp2'>
        <div className={'flex-auto border-t-2 transition duration-500 ease-in-out '}>
          {/*${step.completed? "border-green-600":"border-gray-300"}*/}

          {/* Display line */}
          </div>
          </div>
      </div>
    </div>
    );
});
  return (
    <div className='d-flex justify-content-evenly mt-4 mb-8 '> {/*mx-4 p-4 d-flex justify-between items-center */}
        {displaySteps}
    </div>
  );
};

export default Stepper