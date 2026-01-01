import { useEffect, useState} from "react";

export default function QuizTimer({timeout, onTimeOut}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('Setting timeout');
        //we should add effect here to avoid component re rendering and resetting the timeout
        const timer = setTimeout(() => {
            onTimeOut();
        }, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeOut]);

    useEffect(() => {
        console.log('Setting Interval');        
        //we need use effect here to avoid multiple intervals being created on each render
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100);
        }, 100);

        return () => {
            return clearInterval(interval);
        }
    }, []);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    );
}