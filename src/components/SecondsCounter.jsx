import React from "react";
import PropTypes from "prop-types";

const SecondsCounter = ({ seconds }) => {
  const formatNumber = (num) => num.toString().padStart(6, "0");
  const digits = formatNumber(seconds).split("");

  return (
    <div className="counter-container">
      <div className="digit"><i className="fas fa-clock"></i></div>
      {digits.map((digit, index) => (
        <div key={index} className="digit">{digit}</div>
      ))}
    </div>
  );
};

SecondsCounter.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default SecondsCounter;
