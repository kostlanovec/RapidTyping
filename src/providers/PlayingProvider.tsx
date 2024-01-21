import { createContext, useState } from "react";

type PlayingContext = {
    typingSpeed: number;
    numberMistakes: number;
    time: number;
    mode:string;
    typingText: string,
    timeResult: number;
    setTypingSpeed: React.Dispatch<React.SetStateAction<number>>;
    setNumberMistakes: React.Dispatch<React.SetStateAction<number>>;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    setTypingText: React.Dispatch<React.SetStateAction<string>>;
    setTimeResult: React.Dispatch<React.SetStateAction<number>>;
    
  };
  
  export const PlayingContext = createContext<PlayingContext>({
    typingSpeed: 0,
    numberMistakes: 0,
    time: 0,
    mode:"",
    typingText: "",
    timeResult: 0,
    setTypingSpeed() {},
    setNumberMistakes() {},
    setTime() {},
    setMode() {},
    setTypingText() {},
    setTimeResult() {},
  });
  
  export const PlayingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [numberMistakes, setNumberMistakes] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [mode, setMode] = useState<string>("");
    const [typingText, setTypingText] = useState<string>("");
    const [timeResult, setTimeResult] = useState<number>(0);
  
  
    return (
      <PlayingContext.Provider
        value={{
          typingSpeed,
          numberMistakes,
          time,
          mode,
          typingText,
          timeResult,
          setTypingSpeed,
          setNumberMistakes,
          setTime,
          setMode,
          setTypingText,
          setTimeResult,
        }}
      >
        {children}
      </PlayingContext.Provider>
    );
  };

export default PlayingProvider;