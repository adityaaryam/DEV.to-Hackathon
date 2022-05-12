import React, { useEffect, useState } from "react";
import './App.css';
function Stopwatch(){
    const [time, setTime]=useState(0);
    useEffect(() => {
        let interval;
        if (1) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!1) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [1]);
    return(
        <div >
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)} min </span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)} sec</span>
            {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
        </div>
    )
}
export default Stopwatch;