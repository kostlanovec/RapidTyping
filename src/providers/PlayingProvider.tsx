import React, { createContext, useReducer} from "react";
import { stateType } from "../types/type";

const initialState: stateType = {
  typingSpeed: 0,
  numberMistakes: 0,
  time: 0,
  mode: "test",
  typingText: "Vítej v aplikaci rapid Racing je to aplikace, ve které se snažím zlepšit můj skill skrz react",
  timeResult: 0,
};

type Action =
  | { type: "SET_TYPING_SPEED"; payload: number }
  | { type: "SET_NUMBER_MISTAKES"; payload: number }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_MODE"; payload: string }
  | { type: "SET_TYPING_TEXT"; payload: string }
  | { type: "SET_TIME_RESULT"; payload: number };


function reducer(state: stateType, action: Action): stateType {
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

export const PlayingContext = createContext<[stateType, React.Dispatch<Action>]>([initialState, () => {}]);

export const PlayingProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const reducerBlob = useReducer(reducer, initialState);

  return (
    <PlayingContext.Provider value={reducerBlob}>
      {children}
    </PlayingContext.Provider>
  );
};

export default PlayingProvider;