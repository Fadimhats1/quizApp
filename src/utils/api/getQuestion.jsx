import axios from "axios";
import { answerGenerator } from "../quizFunction/quizFunction";

export async function getQuestion(dispatch) {
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