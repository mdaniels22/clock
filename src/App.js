import React, { useEffect, useState } from "react";
//import styled from "styled-components";

import "./App.css";

function App() {
  const Clock = (props) => {
    let date = new Date();

    const [timeSeconds, setTimeSeconds] = useState(date.getSeconds());
    const [timeMinutes, setTimeMinutes] = useState(date.getMinutes());
    const [timeHours, setTimeHours] = useState(date.getHours() - props.zone);

    const secondsDegrees = (timeSeconds / 60) * 360 + 90; //calculate the angle for the Transform in style
    const minutesDegrees =
      (timeMinutes / 60) * 360 + (timeSeconds / 60) * 6 + 90;
    const hoursDegrees = (timeHours / 12) * 360 + (timeMinutes / 60) * 30 + 90;

    const secondHandStyle = {
      width: "15rem",
      height: "6px",
      background: "red",
      position: "absolute",
      top: "15rem",
      transformOrigin: "100%", //turn the hand from end of x-axis when at 100%. default is 50% and rotates from middle of the element/line
      transition: "all 0.05s",
      transitionTimingFunction: "cubic-bezier(0.1, 2.7, 0.58, 1)", //ticking animation

      transform: `rotate(${secondsDegrees}deg)`, //everytime timeSeconds change the Degrees changes the css position
    };

    const minuteHandStyle = {
      width: "15rem",
      height: "6px",
      background: "black",
      position: "absolute",
      top: "15rem",
      transformOrigin: "100%",
      transition: "all 0.05s",
      transitionTimingFunction: "cubic-bezier(0.1, 2.7, 0.58, 1)",

      transform: `rotate(${minutesDegrees}deg)`,
    };

    const hourHandStyle = {
      width: "15rem",
      height: "6px",
      background: "black",
      position: "absolute",
      top: "15rem",
      transformOrigin: "100%",
      transition: "all 0.05s",
      transitionTimingFunction: "cubic-bezier(0.1, 2.7, 0.58, 1)",

      transform: `rotate(${hoursDegrees}deg)`, //everytime timeSeconds change the Degrees changes the css position
    };

    useEffect(() => {
      const timerSeconds = setInterval(() => {
        setTimeSeconds(
          (prevSec) => (prevSec <= 58 ? prevSec + 1 : (prevSec = 0)) //timer show seconds from 0-59
        );
      }, 1000); //updates every second or 1000 milliseconds
      const timerMinutes = setInterval(() => {
        setTimeMinutes((prevMin) =>
          prevMin <= 58 ? prevMin + 1 : (prevMin = 0)
        );
      }, 60000); //updates every minute or 60000ms
      const timerHours = setInterval(() => {
        setTimeHours((prevHour) =>
          prevHour <= 11 ? prevHour + 1 : (prevHour = 1)
        );
      }, 3600000);

      return () => {
        clearInterval(timerSeconds, timerMinutes, timerHours); //must clean up all useEffects
      };
    }, []);

    return (
      <div>
        <div className="clock">
          <div className="clock-face">
            <div style={hourHandStyle}></div>
            <div style={minuteHandStyle}></div>
            <div style={secondHandStyle}></div>
          </div>
        </div>
      </div>
    );
  };

  const easternTime = 0;
  const centralTime = 1;
  const mountainTime = 2;
  const pacificTime = 3;
  return (
    <div>
      <Clock zone={pacificTime} />
      <Clock zone={centralTime} />
    </div>
  );
}
export default App;
