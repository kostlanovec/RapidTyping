import { createContext, useState, useReducer } from "react";

// Reducer
// react gh pages
type PlayingContext = {
    typingSpeed: number;
    numberMistakes: number;
    time: number;
    mode:string;
    typingText: string,
    timeResult: number;
  };

  type Action =
  | { type: "SET_TYPING_SPEED"; payload: number }
  | { type: "SET_NUMBER_MISTAKES"; payload: number }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_MODE"; payload: string }
  | { type: "SET_TYPING_TEXT"; payload: string }
  | { type: "SET_TIME_RESULT"; payload: number };

type Result = {
  typingSpeed: number;
  numberMistakes: number;
  time: number;
  mode:string;
  typingText: string,
  timeResult: number;
}
function reducer(state: Result, action: Action): Result {
  switch (action.type) {
    case "SET_TYPING_SPEED":
      return { ...state, typingSpeed: action.payload };
    case "SET_NUMBER_MISTAKES":
      return { ...state, numberMistakes: action.payload };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_TYPING_TEXT":
      return { ...state, typingText: action.payload };
    case "SET_TIME_RESULT":
      return { ...state, timeResult: action.payload };
    default:
      return state;
  }
}
  
  export const PlayingContext = createContext<PlayingContext>({
    typingSpeed: 0,
    numberMistakes: 0,
    time: 0,
    mode:"",
    typingText: "",
    timeResult: 0
  });
  
  const initialState = { typingSpeed: 0, numberMistakes: 0, time: 0, mode: "", typingText: "", timeResult: 0};
  export const PlayingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state,  dispatch] = useReducer(reducer, initialState);
    // Tady použít reducer
    const [typingSpeed] = useState<number>(0);
    const [numberMistakes] = useState<number>(0);
    const [time] = useState<number>(0);
    const [mode] = useState<string>("normal");
    const [typingText] = useState<string>("Vítej v aplikaci rapid Racing je to aplikace, ve které se snažím zlepšit můj skill skrz react");
    const [timeResult] = useState<number>(0);
  
    function handleButtonTypingSpeed() {
      dispatch({type: "SET_TYPING_SPEED", payload: 0});
    }
  
    function handleButtonNumberMistakes() {
      dispatch({type: "SET_NUMBER_MISTAKES", payload: 0});
    }
  
    function handleButtonTime() {
      dispatch({type: "SET_TIME", payload: 0});
    }

    function handleButtonMode(){
      dispatch({type: "SET_MODE", payload: "normal"});
    }

    function handleButtonTypingText(){
      dispatch({type: "SET_TYPING_TEXT", payload: ""});
    }

    function handleButtonTimeResult(){
      dispatch({type: "SET_TIME_RESULT", payload: 0});
    }
    
    return (
      <PlayingContext.Provider
        value={{
          typingSpeed,
          numberMistakes,
          time,
          mode,
          typingText,
          timeResult,
        }}
      >
        {children}
      </PlayingContext.Provider>
    );
  };

export default PlayingProvider;