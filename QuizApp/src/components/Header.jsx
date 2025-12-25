import quizLogo from '../assets/quiz-logo.png';

export default function Header(){
    return (
        <header>
            <img src={quizLogo} alt='quiz-logo'/>
            <h2>React Quiz</h2>
        </header>
    );
}