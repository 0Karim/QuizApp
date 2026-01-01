import { useState, useCallback } from "react";
import  QUESTIONS  from "../utils/questions.js" 
import quizCompeleteImg from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

export default function Quiz(){
    const [userAnswers, setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswers.length;    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setUserAnswer((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null)
        , [handleSelectAnswer]);

    if(quizIsComplete){
        return (
            <div id="summary">
                <img src={quizCompeleteImg} alt="quiz-compelete" />
                <h2>Quiz Compeleted !</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question  
                key={activeQuestionIndex}
                index = {activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}