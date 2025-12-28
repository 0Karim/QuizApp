import { useCallback, useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import Question from "./Question.jsx";
import Answer from "./Answer.jsx";
import QuizTimer from "./QuizTimer.jsx";

export default function Quiz() {
    const { 
        questions,
        currentQuestionIndex,
        userAnswers,
        quizIsComplete,
        skipAnswer,
        restartQuiz,
        selectAnswer
    } = useContext(QuizContext);

    const [answerState, setAnswerState] = useState('');

    // Handle timeout - skip to next question when timer runs out
    const handleSkipAnswer = useCallback(() => {
        skipAnswer();
    }, [skipAnswer]);

    // Handle answer selection
    const handleSelectAnswer = useCallback((answer) => {
        setAnswerState('answered');
        
        // After 1 second, check if answer is correct
        setTimeout(() => {
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = answer === currentQuestion.answers[0];
            setAnswerState(isCorrect ? 'correct' : 'wrong');
            
            // After showing result for 2 seconds, move to next question
            setTimeout(() => {
                selectAnswer(answer);
                setAnswerState(''); // Reset for next question
            }, 2000);
        }, 1000);
    }, [questions, currentQuestionIndex, selectAnswer]);

    if (quizIsComplete) {
        const correctAnswers = userAnswers.filter((answer, index) => 
            answer === questions[index].answers[0]
        ).length;
        const skippedAnswers = userAnswers.filter(a => a === null).length;
        const wrongAnswers = userAnswers.length - correctAnswers - skippedAnswers;

        return (
            <div id="quiz">
                <div id="summary">
                    <h2>Quiz Completed! 🎉</h2>
                    <div id="summary-stats">
                        <p>
                            <span className="number">{correctAnswers}</span>
                            <span className="text">Correct Answers</span>                            
                        </p>
                        <p>
                            <span className="number">{wrongAnswers}</span>
                            <span className="text">Wrong Answers</span>                            
                        </p>
                        <p>
                            <span className="number">{skippedAnswers}</span>
                            <span className="text">Skipped</span>
                        </p>
                    </div>
                    <button onClick={restartQuiz}>Restart Quiz</button>                    
                </div>
            </div>
        );
    }

    return (
        <div id="quiz">
            <div id="question">
                {/* Timer only restarts when question changes (currentQuestionIndex) */}
                <QuizTimer 
                    key={currentQuestionIndex}
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                    mode={answerState}
                />
                <Question />
                <Answer 
                    onSelectAnswer={handleSelectAnswer}
                    answerState={answerState}
                />
                <p style={{ marginTop: '2rem', textAlign: 'center', color: '#888' }}>
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
            </div>
        </div>        
    );
}