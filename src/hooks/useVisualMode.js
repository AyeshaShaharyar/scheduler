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
 
    if(history.length < 1){
      return;
    }else{
      const nextMode = history.pop();
      setMode(()=> nextMode);
      setHistory(history);
    }
  };
  
  return { mode, transition, back };
}

