import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook';
import LoadingCircle from '../../loading/loading';
import { buttonAnswers, expiryTimestamp,parseText, timeConvertToSeconds, removeLocalStorageKey} from '../../../utils/quizFunction/quizFunction';
import { getQuestion} from '../../../utils/api/getQuestion';


const QuestionScreen = ({ dispatch, state }) => {
	let currentQuestion;
	let timer = useTimer({
		expiryTimestamp, onExpire: () => {
			dispatch({ type: "setIsDone" });
			removeLocalStorageKey()
		}, autoStart: false,
	})

	useEffect(() => {
		if (localStorage.getItem("currentIndex")) {
			dispatch({ type: "setCurrentIndex", payload: () => JSON.parse(localStorage.getItem("currentIndex")) })
		}
		if (localStorage.getItem("answers")) {
			dispatch({ type: "setAnswers", payload: () => JSON.parse(localStorage.getItem("answers")) });
		}
		getQuestion(dispatch)
	}, []);

	
	if (state.questions.length != []) {
		currentQuestion = state.questions[state.currentIndex];
		localStorage.setItem("timeLeft", timeConvertToSeconds(timer.minutes, timer.seconds));

		const parameterButtonAnswers = {
			currentQuestion: currentQuestion,
			currentIndex: state.currentIndex,
			dispatch: dispatch,
			timer: timer,
		}

		return (
			<>
				{state.isStart ?
					<>
						<div className='grow text-center flex flex-col justify-center gap-6'>
							<h4 className='text-xl bg-slate-800 mx-auto py-2 px-4 rounded-md font-bold'>{(state.currentIndex + 1) + ' / ' + state.questions.length}</h4>
							<h2 className='text-2xl font-bold' dangerouslySetInnerHTML={{ __html: parseText(currentQuestion.question, "text/html") }}></h2>
							<h4 className='text-xl bg-slate-800 mx-auto py-2 px-4 rounded-md font-bold'>{('0' + timer.minutes).slice(-2)} : {('0' + timer.seconds.toString()).slice(-2)}</h4>
						</div>
						<div className='flex gap-4 grow w-full'>
							{
								buttonAnswers(parameterButtonAnswers)
							}
						</div>
					</> : <button className='bg-black mx-auto px-6 py-4 rounded-md font-bold text-xl' onClick={() => {
						dispatch({ type: "setIsStart", payload: true })
						timer.resume();
					}}>
						{state.isResume ? "Resume" : "Start"}
					</button>
				}
			</>
		)
	}

	return (<LoadingCircle />);
}

export default QuestionScreen
