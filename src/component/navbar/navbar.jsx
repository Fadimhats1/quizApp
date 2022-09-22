import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { quizContext } from '../../utils/context/quizContext'

const Navbar = ({ loginData, submitHandle}) => {
  const quizContextValues = useContext(quizContext);
  return (
    <div className='bg-black text-white h-14 fixed top-0 left-0 w-full drop-shadow-md flex items-center justify-end px-8 '>
      {loginData != '' &&
        <button className='flex items-center gap-2 hover:text-slate-400' onClick={()=>{
          localStorage.clear();
          quizContextValues.dispatch({type: "resetState"});
          submitHandle('');
        }}>
          <FontAwesomeIcon className='text-xl' icon={fa.faUserNinja} />
          <p className='text-lg'>{loginData}</p><FontAwesomeIcon className='text-xl' icon={fa.faArrowRightFromBracket} />
        </button>}
    </div>
  )
}

export default Navbar