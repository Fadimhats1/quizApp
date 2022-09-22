export const initialStateQuiz = {
    questions: [],
    currentIndex: 0,
    isStart: false,
    isResume: false,
    isDone: false,
    answers: [],
}

export const quizReducer = (state, action) => {
    switch (action.type) {
        case "resetState":
         return{
            ...initialStateQuiz
         };
         case "setQuestions":
         return{
            ...state, 
            questions: action.payload.data,
            isResume: action.payload.isResume
         };

         case "setCurrentIndex":
         return{
            ...state,
            currentIndex: action.payload(state.currentIndex),
         };


         case "setIsStart":
         return{
            ...state,
            isStart: action.payload,
         };

         case "setIsResume":
         return{
            ...state,
            isResume: action.payload,
         };
         case "setAnswers":
         return{
            ...state,
            answers: action.payload(state.answers),
         };
         case "setIsDone":
         return{
            ...initialStateQuiz,
            answers: state.answers,
            isDone: !state.isDone,
         };
        default:
            return state;
    }
}
