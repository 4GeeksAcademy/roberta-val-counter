import React from "react";
import "../index.css";

function SecondsCounter(props) {
    const digits = props.seconds.toString().padStart(6, "0").split("");

    return (
        <div className="counter-container">
            <div className="clock-icon">
                <i className="far fa-clock"></i>
            </div>
            {digits.map((digit, index) => (
                <div className="digit-box" key={index}>
                    {digit}
                </div>
            ))}
        </div>
    );
}

export default SecondsCounter;


