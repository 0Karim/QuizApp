import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import QuizContextProvider from "./context/QuizContext.jsx";

function App() {
    return (
    <QuizContextProvider>
        <Header />
        <Quiz />
    </QuizContextProvider>
    );
}

export default App;
