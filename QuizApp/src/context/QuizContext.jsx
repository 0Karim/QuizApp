import { createContext, useReducer } from "react";
import QUESTIONS from '../utils/questions.js';

export const QuizContext = createContext({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      quizIsComplete: false,
      selectAnswer: () => {},
      skipAnswer: () => {},
      restartQuiz: () => {}
});


// Reducer function - manages all quiz state
function quizReducer(state, action){
    // Reducer logic will go here
    switch(action.type){
        case 'SELECT_ANSWER':
            return {
                ...state,
                userAnswers:[...state.userAnswers, action.payload],
                currentQuestionIndex: state.currentQuestionIndex + 1
            };
        case 'SKIP_ANSWER':
            return {
                ...state,
                userAnswers:[...state.userAnswers, null],
                currentQuestionIndex: state.currentQuestionIndex + 1
            };
        case 'RESTART_QUIZ':
            return {
                currentQuestionIndex: 0,
                userAnswers: []
            };
        default:
            return state;
    }
}

export default function QuizContextProvider({children}){

    const initialState = {
    currentQuestionIndex: 0,
    userAnswers: [],
  };

    // You can add any shared state here
    const [quizState, QuizStateDispatch] = useReducer(quizReducer, initialState);
    const { currentQuestionIndex, userAnswers } = quizState;
    
    // Check if quiz is completed
    const quizIsComplete = currentQuestionIndex >= QUESTIONS.length;

    // const currentQuestionIndex = quizState.currentQuestionIndex;  
    // const quizIsComplete = currentQuestionIndex >= QUESTIONS.length;

  function handleSelectAnswer(answerIndex){
    return QuizStateDispatch({
        type: 'SELECT_ANSWER',
        payload: answerIndex
    });
  }

  function handleSkipAnswer(){
    return QuizStateDispatch({
        type: 'SKIP_ANSWER'
    });
  }

  function handleRestartQuiz(){
    return QuizStateDispatch({
        type: 'RESTART_QUIZ'
    });
  }

 const ctxValue = {
    questions: QUESTIONS,
    currentQuestionIndex: currentQuestionIndex,
    userAnswers : userAnswers,
    quizIsComplete: quizIsComplete,
    selectAnswer: handleSelectAnswer,
    skipAnswer: handleSkipAnswer,
    restartQuiz: handleRestartQuiz
  };    

return <QuizContext.Provider value={ctxValue}>
        {children}
    </QuizContext.Provider>  
}

