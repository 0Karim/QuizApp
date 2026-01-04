import { useState } from "react";
import QuizTimer from "./QuizTimer.jsx";
import Answer from "./Answer.jsx";
import QUESTIONS from "../utils/questions.js";

export default function Question({index, onSelectAnswer, onSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if(answer.selectedAnswer){
        timer = 1000;
    }

    if(answer.isCorrect){
        timer = 2000;
    }

    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: answer === QUESTIONS[index].answers[0]
            });

            setTimeout(()=> {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000)
    }

    let answerState='';
    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
    else if(answer.selectedAnswer){
        answerState = 'answered'
    }

    return (
        <div id="question">
            <QuizTimer 
                key={timer}
                timeout={timer}
                onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>
                {QUESTIONS[index].text}
            </h2>
            <Answer                 
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer} 
                answerState={answerState} 
                onSelect={handleSelectAnswer} 
            />
        </div>
    );
}