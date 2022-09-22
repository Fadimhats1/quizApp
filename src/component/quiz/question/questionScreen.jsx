import axios from 'axios';
import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook';
import LoadingCircle from '../../loading/loading';

const colorButton = [
	{
		color: "bg-rose-600 ",
		colorHover: "hover:bg-rose-500 ",
		shadowColor: "shadow-solid1 ",
	},
	{
		color: "bg-amber-600 ",
		colorHover: "hover:bg-amber-500 ",
		shadowColor: "shadow-solid2 ",
	},
	{
		color: "bg-sky-600 ",
		colorHover: "hover:bg-sky-500 ",
		shadowColor: "shadow-solid3 ",
	},
	{
		color: "bg-emerald-600 ",
		colorHover: "hover:bg-emerald-500 ",
		shadowColor: "shadow-solid4 ",
	},
]

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
		getQuestion()
	}, []);

	useEffect(() => {
		if (state.currentIndex != 0 && state.isStart)
			timer.resume();
	}, [state.currentIndex])

	async function getQuestion() {
		let result = { data: [], isResume: false };

		if (localStorage.getItem("questions")) {
			result.data = JSON.parse(localStorage.getItem("questions"))
			result.isResume = true;
		} else {
			let data = []
			await axios.get('https://opentdb.com/api.php?amount=10&category=31').then((res) => {
				data = res.data.results;
			})
			result.data = data.map((d) => answerGenerator(d))
			localStorage.setItem("questions", JSON.stringify(result.data));
		}
		dispatch({ type: "setQuestions", payload: result });
	}


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

function buttonAnswers(parameterButtonAnswers) {
	const { currentQuestion, currentIndex, timer, dispatch } = parameterButtonAnswers

	const parameterCheckAnswer = {
		currentQuestion: currentQuestion,
		dispatch: dispatch,
	};

	const buttons = currentQuestion.answers.map((data, i) => <button value={data} className={`w-[25%] text-center rounded-md grow px-4 py-2 text-white ${colorButton[i].color + colorButton[i].colorHover + colorButton[i].shadowColor} shadow-solid grow`} key={data}
		onClick={(e) => {

			if (currentIndex < 9) {
				dispatch({ type: "setCurrentIndex", payload: (current) => current + 1 });
				localStorage.setItem("currentIndex", JSON.stringify(currentIndex + 1));
			} else {
				dispatch({ type: "setIsDone" });
				removeLocalStorageKey();
			}
			checkAnswer({ ...parameterCheckAnswer, e: e });
			timer.pause();

		}} dangerouslySetInnerHTML={{ __html: parseText(data, "text/html") }}></button>);

	return buttons;
}

function checkAnswer(parameterCheckAnswer) {
	const { e, currentQuestion, dispatch } = parameterCheckAnswer
	if (e.target.value == currentQuestion.correct_answer)
		dispatch({
			type: "setAnswers", payload: (current) => {
				localStorage.setItem("answers", JSON.stringify([...current, { isCorrect: true }]))
				return [...current, { isCorrect: true }]
			}
		})
	else
		dispatch({
			type: "setAnswers", payload: (current) => {
				localStorage.setItem("answers", JSON.stringify([...current, { isCorrect: false }]))
				return [...current, { isCorrect: false }]
			}
		})

}

function parseText(text, type) {
	return new DOMParser().parseFromString(text, type).documentElement.textContent
}

function timeConvertToSeconds(minutes, seconds) {
	let result = 0;
	if (minutes) {
		result += (minutes * 60)
	}
	return result += seconds;
}

function expiryTimestamp(timeLeft = 60) {
	if (localStorage.getItem("timeLeft")) {
		timeLeft = JSON.parse(localStorage.getItem("timeLeft"));
	}
	const time = new Date();
	time.setSeconds(time.getSeconds() + timeLeft)
	return time;
}

function answerGenerator(d) {
	let i = 0;
	let length = 1 + d.incorrect_answers.length
	let arrayAnswers = Array.apply(null, Array(length)).map(() => '')
	arrayAnswers[Math.floor(Math.random() * length)] = d.correct_answer;
	do {
		let currIndex = Math.floor(Math.random() * length);
		if (arrayAnswers[currIndex] === '') {
			arrayAnswers[currIndex] = d.incorrect_answers[i];
			i++;
		}
	} while (arrayAnswers.includes(''))
	return { ...d, answers: arrayAnswers }
}

function removeLocalStorageKey() {
	localStorage.removeItem("questions")
	localStorage.removeItem("timeLeft")
	localStorage.removeItem("currentIndex")
}
export default QuestionScreen
