import React, { useState } from 'react'
import Setupconta from './setupconta_function';
import Setupendereco from './setupendereco_function';
import Setuppagamento from './setuppagamento_function';
import Setuppedido from './setuppedido_function';
import {useSelector, useDispatch} from 'react-redux';


function forms_function() {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const [step, setStep] = useState(0);

    const nextStep = () => {
        setStep(step + 1);
    }
    const prevStep = () => {
        setStep(step - 1);
    }
  
    switch (step) {
        case 0:
            return (
                <>
                    <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-tacao shadow-lg rounded'>
                        <div className='mt-10'>
                            <Setupconta
                                step={step}
                                nextStep={nextStep}
                                prevStep={prevStep}
                            />
                        </div>
                    </div>
                </>
            );
        case 1:
            return (
                <>
                    <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded ' style={{ top: '100px' }}>
                        <div className='mt-10'>
                            <Setupendereco
                                step={step}
                                nextStep={nextStep}
                                prevStep={prevStep}
                            />
                        </div>
                    </div>
                </>
            );
        case 2:
            return (
                <>
                    <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded ' style={{ top: '100px' }}>
                        <div className='mb-10'>
                            <Setuppagamento
                                step={step}
                                nextStep={nextStep}
                                prevStep={prevStep}
                            />
                        </div>
                    </div>
                </>
            );
        case 3:
            return (
                <>
                    <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded ' style={{ top: '100px' }}>
                        <div className='mb-10'>
                            <Setuppedido
                                step={step}
                                nextStep={nextStep}
                                prevStep={prevStep}
                            />
                        </div>
                    </div>
                </>

            );
            case 4:
            return (
                <>
                    <div className='d-block align-items-center rounded container-sm  col-sm-4 bg-banana-mania shadow-lg rounded ' style={{ top: '100px' }}>
                        <div className='mb-10'>
                            <Setuppedido
                                step={step}
                                nextStep={nextStep}
                                prevStep={prevStep}
                            />
                        </div>
                    </div>
                </>

            );
    }
}

export default forms_function


