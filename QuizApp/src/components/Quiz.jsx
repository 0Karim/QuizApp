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
  } = useContext(QuizContext);

  const [answerState, setAnswerState] = useState(""); // '', 'answered', 'correct', 'wrong'

  // console.log(questions);
  // console.log('Current Question Index:', currentQuestionIndex);
  // console.log('User Answers:', userAnswers);

  // Handle timeout - skip to next question
  const handleSkipAnswer = useCallback(() => {
    if (answerState === "") {
      skipAnswer();
      setAnswerState("");
    }
  }, [answerState, skipAnswer]);

  const handleSelectAnswer = useCallback(
    (answer) => {
      setAnswerState("answered");

      // After 1 second, check if answer is correct

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answer === currentQuestion.answers[0];
      setAnswerState(isCorrect ? "correct" : "wrong");

      // After showing result for 2 seconds, move to next question
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    },
    [questions, currentQuestionIndex]
  );

  // When answer is selected, update answer state
  // const handleAnswerSelected = useCallback((state) => {
  //     setAnswerState(state);
  // }, []);

  // Reset answer state when moving to next question
  const handleNextQuestion = useCallback(() => {
    setAnswerState("");
  }, []);

  if (quizIsComplete) {
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === questions[index].answers[0]
    ).length;
    const skippedAnswers = userAnswers.filter((a) => a === null).length;

    return (
      <div id="quiz">
        <div id="summary">
          <img src="/quiz-complete.png" alt="Quiz completed" />
          <h2>Quiz Completed! 🎉</h2>
          <div id="summary-stats">
            <p>
              <span className="number">{correctAnswers}</span>
              <span className="text">Correct Answers</span>
            </p>
            <p>
              <span className="number">
                {userAnswers.length - correctAnswers - skippedAnswers}
              </span>
              <span className="text">Wrong Answers</span>
            </p>
            <p>
              <span className="number">{skippedAnswers}</span>
              <span className="text">Skipped Questions</span>
            </p>
          </div>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      </div>
    );

    // return (
    // <div id="quiz">
    //     <div id="summary">
    //     <h2>Quiz Completed! 🎉</h2>
    //     <p>You answered {userAnswers.length} questions</p>
    //     <p>
    //         Correct: {userAnswers.filter((answer, index) =>
    //         answer === questions[index].answers[0]
    //         ).length}
    //     </p>
    //     <p>Skipped: {userAnswers.filter(a => a === null).length}</p>
    //     <button onClick={restartQuiz}>Restart Quiz</button>
    //     </div>
    // </div>
    // );
  }

  // Different timeouts based on answer state
  let timer = 10000; // 10 seconds to answer
  if (answerState === "answered") {
    timer = 1000; // 1 second to show selected state
  }

  if (answerState === "correct" || answerState === "wrong") {
    timer = 2000; // 2 seconds to show result
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div id="quiz">
      <div id="question">
        <QuizTimer
          key={currentQuestionIndex + answerState}
          timeout={timer}
          onTimeout={answerState === "" ? handleSkipAnswer : handleNextQuestion}
          mode={answerState}
        />
        <Question />
        <Answer
          // onSelectAnswer={handleAnswerSelected}
          onSelectAnswer={handleSelectAnswer}
          answerState={answerState}
        />

        <p style={{ marginTop: "2rem", textAlign: "center", color: "#888" }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>

        {/* Temporary test buttons */}
        {/* <div style={{ marginTop: '2rem' }}>
                <button onClick={() => selectAnswer('Test Answer')}>
                    Select Answer (Test)
                </button>
                <button onClick={skipAnswer} style={{ marginLeft: '1rem' }}>
                    Skip Question
                </button>
                </div> */}
      </div>
    </div>
  );
}
