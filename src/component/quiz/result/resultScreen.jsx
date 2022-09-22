import React from 'react'

const ResultScreen = ({ dataAndFunResult }) => {
    let {answers} = dataAndFunResult.state
    const {dispatch} = dataAndFunResult;
    if(localStorage.getItem("isDone")){
        answers = JSON.parse(localStorage.getItem("answers")) != null ? JSON.parse(localStorage.getItem("answers")) : []
    }else
        localStorage.setItem("isDone", JSON.stringify(true))
    let correct = 0;
    let inCorrect = 0;
    console.log(dataAndFunResult.state.answers);
    let totalAnswered = answers.length;
    answers.forEach(element => {
        if (element.isCorrect == true)
            correct++;
        else
            inCorrect++;
    });
    return (
        <div className='h-[calc(100%_-_80px)] flex flex-col'>
            <div className='flex justify-center items-center grow gap-4 '>
                <div className='flex flex-col items-center gap-4'>
                    <div className='text-9xl bg-green-500 rounded-md py-6 px-8 text-center'>{correct}</div>
                    <p>Correct</p>
                </div>
                <p className='text-9xl'>:</p>
                <div className='flex flex-col items-center gap-4'>
                    <div className='text-9xl bg-red-500 rounded-md py-6 px-8 text-center'>{inCorrect} </div>
                    <p>In correct</p>
                </div>
                <p className='text-5xl'>Out Of</p>
                <div className='text-9xl bg-slate-500 rounded-md py-12 px-10 text-center relative'>{totalAnswered} </div>
            </div>
            <div className='flex grow items-center flex-col gap-8'>
                <p className='text-2xl font-bold'>{correct > inCorrect ? "Wow you are a real Otaku, keep improving your Otaku performance" : "You are a normies huh?"}</p>
                <button className='bg-black mx-auto px-4 py-2 rounded-md font-bold' onClick={()=>{
                    localStorage.removeItem("isDone")
                    localStorage.removeItem("answers")
                    dispatch({type: "resetState"})
                }}>Try again?</button>
            </div>
        </div>
    )
}

export default ResultScreen