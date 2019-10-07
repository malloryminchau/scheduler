import React, { useState } from "react"

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      history.pop()
      history.push(mode)
      setMode(history[history.length - 1])
    } else{
      console.log("TESTING", mode)
      history.push(mode)
      setMode(history[history.length - 1])
    }
    
  }
  function back() { 
    if (mode !== initial) {
      history.pop()
      setMode(history[history.length - 1])
    }
   }
  return { mode, transition, back };
};

