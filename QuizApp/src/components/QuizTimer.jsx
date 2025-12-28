import { useState, useEffect, useRef } from "react";

export default function QuizTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Set timeout to call onTimeout when time runs out
    timeoutRef.current = setTimeout(() => {
        onTimeout();
    }, timeout);
    
    // Update remaining time every 10ms for smooth animation    
    intervalRef.current = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 10);
    }, 10);
    
    // Cleanup function - clear timers when component unmounts or dependencies change
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [timeout, onTimeout]);

  return (
    <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
  );
}