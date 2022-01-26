import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(prev => ([...prev, mode]))
    }
    setMode(() => newMode);
  };

  const back = () => {
    // the user may go back to their previous component, as long as it was not their first move
    if (history[history.length - 1] !== initial) {
      history.pop();
      setMode(() => history[history.length - 1]);
    }
  };
  
  return { mode, transition, back };
}

