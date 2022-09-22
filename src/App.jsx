import React, { useEffect, useReducer, useState } from 'react'
import Footer from './component/footer/footer';
import LoginScreen from './component/login/loginScreen';
import Navbar from './component/navbar/navbar';
import QuizScreen from './component/quiz/quizScreen';
import QuizContext from './utils/context/quizContext';
import {initialStateQuiz, quizReducer } from './utils/reducer/reducer';

const AppWrapper = () => {
  const [loginData, setLoginData] = useState('');
  const [inputChange, setInputChange] = useState('')
  const [state, dispatch] = useReducer(quizReducer, initialStateQuiz)

  useEffect(() => {
    if (localStorage.getItem('userLogin')) {
      setLoginData(JSON.parse(localStorage.getItem('userLogin')))
    }
  }, [])

  function changeHandle(e) {
    setInputChange(e.target.value);
  }

  function submitHandle(data) {
    if(data)
    localStorage.setItem("userLogin", JSON.stringify(data));
    setLoginData(data)
    setInputChange('')
  }

  const quizContextValues = {
    state: state,
    dispatch: dispatch,
  }

  return (
    <QuizContext values={quizContextValues}>
      <App submitHandle={submitHandle} loginData={loginData} inputChange={inputChange} changeHandle={changeHandle}/>
    </QuizContext>
  )
}

const App = ({submitHandle, loginData, inputChange, changeHandle}) => {
  return (
    <div className='w-screen'>
      <Navbar loginData={loginData} submitHandle={submitHandle}/>
      <div className='pt-14 px-4 bg-black max-h-screen h-screen text-white'>
        {loginData != '' ? <QuizScreen /> : <LoginScreen changeHandle={changeHandle} submitHandle={submitHandle} inputData={inputChange} />}
      </div>
      <Footer />
    </div>

  )
}


export default AppWrapper
