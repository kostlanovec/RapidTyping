import { createContext, useState } from "react";

type StatisticContext = {
    jmenohrace: string;
    typingSpeed: number;
    numberMistakes: number;
    time: number;
    mode:string;
    toggleJmeno: (jmeno: string) => void;
    setTypingSpeed: React.Dispatch<React.SetStateAction<number>>;
    setNumberMistakes: React.Dispatch<React.SetStateAction<number>>;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    
  };
  
  export const StatisticContext = createContext<StatisticContext>({
    jmenohrace: "",
    typingSpeed: 0,
    numberMistakes: 0,
    time: 0,
    mode:"",
    toggleJmeno() {},
    setTypingSpeed() {},
    setNumberMistakes() {},
    setTime() {},
    setMode() {},
  });
  
  export const StatisticProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [jmenohrace, setJmenoHrace] = useState<string>("");
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [numberMistakes, setNumberMistakes] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [mode, setMode] = useState<string>("");
  
    const toggleJmeno = (jmeno: string) => {
      setJmenoHrace(jmeno);
    };
  
    return (
      <StatisticContext.Provider
        value={{
          jmenohrace,
          typingSpeed,
          numberMistakes,
          time,
            mode,
          toggleJmeno,
          setTypingSpeed,
          setNumberMistakes,
          setTime,
            setMode,
        }}
      >
        {children}
      </StatisticContext.Provider>
    );
  };

export default StatisticProvider;