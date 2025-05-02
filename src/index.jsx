import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SecondsCounter from "./components/SecondsCounter.jsx";

let counter = 0;
let interval = null;
let countdown = false;
let targetTime = null;

const root = ReactDOM.createRoot(document.getElementById("app"));

function renderCounter() {
    root.render(
        <div>
            <SecondsCounter seconds={counter} />
            <div className="controls">
                <button onClick={start}>▶️ Start</button>
                <button onClick={stop}>⏸️ Stop</button>
                <button onClick={reset}>🔁 Reset</button>
                <button onClick={setCountdown}>⏬ Countdown</button>
                <input type="number" id="countInput" placeholder="Countdown from..." />
                <input type="number" id="alertInput" placeholder="Alert at..." />
            </div>
        </div>
    );
}

function start() {
    if (interval) return;
    interval = setInterval(() => {
        if (countdown) {
            counter--;
            if (counter < 0) {
                stop();
                alert("Countdown finished!");
                return;
            }
        } else {
            counter++;
        }

        if (targetTime !== null && counter === targetTime) {
            alert(`⏰ Reached target time: ${targetTime} seconds!`);
        }

        renderCounter();
    }, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    counter = 0;
    countdown = false;
    targetTime = null;
    renderCounter();
}

function setCountdown() {
    const input = document.getElementById("countInput").value;
    const alertInput = document.getElementById("alertInput").value;
    const countValue = parseInt(input);
    const alertValue = parseInt(alertInput);

    if (!isNaN(countValue)) {
        counter = countValue;
        countdown = true;
    }

    if (!isNaN(alertValue)) {
        targetTime = alertValue;
    }

    renderCounter();
}

renderCounter();

