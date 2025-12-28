import { useContext } from 'react';
import { QuizContext } from "../context/QuizContext";

export default function Question(){
    const {questions, currentQuestionIndex } = useContext(QuizContext);
    var currentQuestion = questions[currentQuestionIndex];
    return (
        <div id='question'>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <h2>{currentQuestion.text}</h2>
        </div>
    );
}