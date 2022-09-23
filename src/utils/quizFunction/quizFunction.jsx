import { colorButton } from "../color/color";


export function buttonAnswers(parameterButtonAnswers) {
	const { currentQuestion, currentIndex, dispatch } = parameterButtonAnswers

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


export function parseText(text, type) {
	return new DOMParser().parseFromString(text, type).documentElement.textContent
}

export function timeConvertToSeconds(minutes, seconds) {
	let result = 0;
	if (minutes) {
		result += (minutes * 60)
	}
	return result += seconds;
}

export function expiryTimestamp(timeLeft = 60) {
	if (localStorage.getItem("timeLeft")) {
		timeLeft = JSON.parse(localStorage.getItem("timeLeft"));
	}
	const time = new Date();
	time.setSeconds(time.getSeconds() + timeLeft)
	return time;
}

export function answerGenerator(d) {
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

export function removeLocalStorageKey() {
	localStorage.removeItem("questions")
	localStorage.removeItem("timeLeft")
	localStorage.removeItem("currentIndex")
}
