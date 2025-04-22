import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SecondsCounter from "./components/SecondsCounter.jsx";

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isCountdown, setIsCountdown] = useState(false);
  const [target, setTarget] = useState(10);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) =>
          isCountdown ? Math.max(prev - 1, 0) : prev + 1
        );
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isCountdown]);

  useEffect(() => {
    if (seconds === target) {
      alert(`🎯 Reached target time: ${target} seconds`);
    }
  }, [seconds, target]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(isCountdown ? 60 : 0);
  };
  const toggleMode = () => {
    setIsCountdown(!isCountdown);
    setSeconds(!isCountdown ? 60 : 0);
  };

  return (
    <div className="app">
      <SecondsCounter seconds={seconds} />
      <div className="controls">
        <button onClick={handleStart}>▶️ Start</button>
        <button onClick={handleStop}>⏸️ Stop</button>
        <button onClick={handleReset}>🔁 Reset</button>
        <button onClick={toggleMode}>
          {isCountdown ? "Switch to Count Up" : "Switch to Countdown"}
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
