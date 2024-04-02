import React,{useContext} from 'react'
import { useStepperContext } from '../../../context/StepperContext'

export default function Conta() {
    const{userData,setUserData} = useStepperContext();
    const handleChange = (e) =>{
        const{name,value} = e.target;
        setUserData({...userData,[name]:value});
    };
  return (
      <div className=' p-2'> {/*col-sm-2*/}
          <div className=''>
              <div className=''>
                  {" "}
                  {/*Username*/}
              </div>
              <div className=''>
                  <div className=' bg-white my-2 p-1 border border-gray-200 rounded'>
                      <input onChange={handleChange}
                          value={userData["username"] || ""}
                          name="username"
                          placeholder="Username"
                          className='p-1 px-2 appearance-none outline-none w-full text-gra-800' />
                  </div>
              </div>
          </div>
          <div className=''>
              <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
                  {" "}
                  {/*Password*/}
              </div>
              <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
                  <input onChange={handleChange}
                      value={userData["password"] || ""}
                      name="password"
                      placeholder="Password"
                      type='password'
                      className='p-1 px-2 appearance-none outline-none w-full text-gra-800' />
              </div>
          </div>
      </div>
  )
}
