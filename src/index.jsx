import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SecondsCounter from "./components/SecondsCounter.jsx";

let timer = null;

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCountdown, setIsCountdown] = useState(false);

  const startCounter = () => {
    if (timer) return; 
    setIsRunning(true);
    timer = setInterval(() => {
      setSeconds(prev => {
        if (isCountdown) {
          if (prev === 0) {
            clearInterval(timer);
            timer = null;
            alert("⏰ Countdown finished!");
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);
  };

  const stopCounter = () => {
    clearInterval(timer);
    timer = null;
    setIsRunning(false);
  };

  const resetCounter = () => {
    stopCounter();
    setSeconds(isCountdown ? 60 : 0);
  };

  const toggleMode = () => {
    stopCounter();
    setIsCountdown(!isCountdown);
    setSeconds(!isCountdown ? 60 : 0);
  };

  return (
    <div className="app">
      <SecondsCounter seconds={seconds} />
      <div className="controls">
        <button onClick={startCounter} disabled={isRunning}>▶️ Start</button>
        <button onClick={stopCounter} disabled={!isRunning}>⏸️ Stop</button>
        <button onClick={resetCounter}>🔁 Reset</button>
        <button onClick={toggleMode}>
          {isCountdown ? "Switch to Count Up" : "Switch to Countdown"}
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

