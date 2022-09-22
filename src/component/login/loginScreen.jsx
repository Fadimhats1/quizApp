import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'

const LoginScreen = ({changeHandle, submitHandle, inputData}) => {
  return (
    <div className='bg-purple-900 h-[calc(100%_-_80px)] rounded-t-lg flex items-center justify-center relative'>
      <div className='bg-slate-900 h-48 w-96 rounded-lg drop-shadow-lg py-4 px-8 flex flex-col items-center pt-8 gap-2 z-10'>
        <div className='text-2xl font-bold'>Login</div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="login" className='cursor-pointer'>Username</label>
        <div className='flex gap-2'>
            <input className='text-black px-4 rounded-md font-bold' type="text" name="login" id="login" value={inputData} onChange={(e)=> changeHandle(e)} />
            <button className={`px-3 py-1 border-2 border-white rounded-md`} onClick={()=>{
              if(changeHandle != '')
                submitHandle(inputData)
            }}><FontAwesomeIcon icon={fa.faChevronRight} /></button>
          </div>
       </div>
      </div>
      <h1 className='absolute top-4 text-9xl translate-y-1/2'>AN<span className='text-slate-900'>IM</span>E Q<span className='text-slate-900'>UI</span>Z</h1>
    </div>
  )
}

export default LoginScreen