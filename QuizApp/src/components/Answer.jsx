import { useContext, useEffect, useState, useRef } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Answer({ onSelectAnswer, answerState }) {
  const { questions, currentQuestionIndex, selectAnswer } =
    useContext(QuizContext);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  //   const [answerState, setAnswerState] = useState(''); // '', 'selected', 'correct', 'wrong'
  const currentQuestion = questions[currentQuestionIndex];
  //const answerSelectedRef = useRef(false);

  // Shuffle answers when question changes
  useEffect(() => {
    const answers = [...currentQuestion.answers];
    answers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(answers);
    setSelectedAnswer(null);
    // setAnswerState('');
    //answerSelectedRef.current = false;
  }, [currentQuestionIndex, currentQuestion]);

  // Move to next question after showing result (ONLY THIS ONE)
  useEffect(() => {
    if (
      (answerState === "correct" || answerState === "wrong") &&
      selectedAnswer
    ) {
      const timer = setTimeout(() => {
        selectAnswer(selectedAnswer);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [answerState, selectedAnswer, selectAnswer]);

  //   // Move to next question after showing result
  //   useEffect(() => {
  //     if (answerState === 'correct' || answerState === 'wrong') {
  //       const timer = setTimeout(() => {
  //         selectAnswer(selectedAnswer);
  //       }, 2000);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [answerState, selectedAnswer, selectAnswer]);

  //   // Handle answer selection with timing
  //   useEffect(() => {
  //     if (answerState === 'answered' && selectedAnswer){
  //         const timer = setTimeout(() => {
  //         const isCorrect = selectedAnswer === currentQuestion.answers[0];
  //         onSelectAnswer(isCorrect ? 'correct' : 'wrong');
  //       }, 1000);

  //       return () => clearTimeout(timer);
  //     }

  //     if ((answerState === 'correct' || answerState === 'wrong') && selectedAnswer) {
  //       const timer = setTimeout(() => {
  //         selectAnswer(selectedAnswer);
  //       }, 2000);

  //       return () => clearTimeout(timer);
  //     }
  //   }, [answerState, selectedAnswer, currentQuestion, selectAnswer, onSelectAnswer]);

  function handleSelectAnswer(answer) {
    // if (answerSelectedRef.current) return; // Prevent multiple selections
    if (answerState !== "") return;

    // answerSelectedRef.current = true;

    setSelectedAnswer(answer);
    // setAnswerState('selected');
    // onSelectAnswer('answered');
    onSelectAnswer(answer);

    // Show if answer is correct/wrong after a delay
    // setTimeout(() => {
    //     if(answer === currentQuestion.answers[0]){
    //         setAnswerState('correct');
    //     }else{
    //         setAnswerState('wrong');
    //     }

    //     // Move to next question after showing result
    //     setTimeout(() => {
    //         selectAnswer(answer);
    //     }, 2000)
    // }, 1000);
  }

  // Get CSS class for answer button
  //   function getAnswerClass(answer) {
  //     const isSelected = selectedAnswer === answer;

  //     if (answerState === 'answered' && isSelected) {
  //       return 'selected';
  //     }

  //     if (answerState === 'correct' && isSelected) {
  //       return 'correct';
  //     }

  //     if (answerState === 'wrong' && isSelected) {
  //       return 'wrong';
  //     }

  //     return '';
  //   }

  function getAnswerClass(answer) {
    const isSelected = selectedAnswer === answer;

    if (!isSelected) return "";

    if (answerState === "answered") return "selected";
    if (answerState === "correct") return "correct";
    if (answerState === "wrong") return "wrong";
    return "";
  }

  console.log("shuffled => " + shuffledAnswers);
  // return(
  //     // <ul id="answers">
  //     //     {shuffledAnswers.map((answer) => {

  //     //         // const isSelected = selectedAnswer === answer;
  //     //         // let cssClass = '';
  //     //         // if (answerState === 'selected' && isSelected) {
  //     //         // cssClass = 'selected';
  //     //         // }
  //     //         // if (answerState === 'correct' && isSelected) {
  //     //         // cssClass = 'correct';
  //     //         // }
  //     //         // if (answerState === 'wrong' && isSelected) {
  //     //         // cssClass = 'wrong';
  //     //         // }

  //     //         // return (
  //     //         // <li key={answer} className="answer">
  //     //         //     <button
  //     //         //     onClick={() => handleSelectAnswer(answer)}
  //     //         //     disabled={selectedAnswer !== null}
  //     //         //     // className={cssClass}
  //     //         //     className={getAnswerClass(answer)}
  //     //         //     >
  //     //         //     {answer}
  //     //         //     </button>
  //     //         // </li>
  //     //         // );
  //     //     })}
  //     // </ul>
  // );

  return (
    <ul id="answers">
      {shuffledAnswers.map((answer) => {
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => handleSelectAnswer(answer)}
              disabled={answerState !== ""}
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
