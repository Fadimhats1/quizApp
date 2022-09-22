import { useContext } from 'react';
import { quizContext } from '../../utils/context/quizContext';
import QuestionScreen from './question/questionScreen';
import ResultScreen from './result/resultScreen';

const QuizScreen = () => {
	const quizContextValues = useContext(quizContext);
    return (
        <div className='h-full bg-purple-900 rounded-lg'>
            {
            quizContextValues.state.isDone || localStorage.getItem("isDone")?
                <ResultScreen dataAndFunResult={quizContextValues} />
                :
                <div className='h-[calc(100%_-_80px)] flex flex-col w-full p-4 justify-center'>
                    <QuestionScreen dispatch={quizContextValues.dispatch} state={quizContextValues.state} />
                </div>
            }
        </div>
    )
}

export default QuizScreen