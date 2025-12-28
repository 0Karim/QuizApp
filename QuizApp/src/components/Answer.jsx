import { useContext, useEffect, useState } from 'react';
import { QuizContext } from "../context/QuizContext";

export default function Answer({ onSelectAnswer, answerState }) {
  const { questions, currentQuestionIndex } = useContext(QuizContext);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const currentQuestion = questions[currentQuestionIndex];

  // Shuffle answers when question changes
  useEffect(() => {
    const answers = [...currentQuestion.answers];
    answers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(answers);
    setSelectedAnswer(null);
  }, [currentQuestionIndex, currentQuestion]);

  function handleSelectAnswer(answer) {
    if (answerState !== '') return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    onSelectAnswer(answer); // Pass the answer to Quiz component
  }

  function getAnswerClass(answer) {
    if (selectedAnswer !== answer) return '';
    
    if (answerState === 'answered') return 'selected';
    if (answerState === 'correct') return 'correct';
    if (answerState === 'wrong') return 'wrong';
    
    return '';
  }

  return (
    <ul id="answers">
      {shuffledAnswers.map((answer) => {
        return (
          <li key={answer} className="answer">
            <button 
              onClick={() => handleSelectAnswer(answer)}
              disabled={answerState !== ''}
              className={getAnswerClass(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
