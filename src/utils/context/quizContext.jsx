import React, { createContext } from 'react'

export const quizContext = createContext();

const QuizContext = ({ children, values }) => {
    return (
        <quizContext.Provider value={values}>
            {children}
        </quizContext.Provider>
    )
}

export default QuizContext