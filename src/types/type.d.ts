// Definujme si, že existuje nějaká funkce
export type CountDownProps = {
    onCountdownEnd: () => void;
};
type TypingProps = {
    handleButtonResult: (mistakes: number, speed: number, time: number) => void;
    text:string;
    time:number;
    mode:string;
  };

type CustomSettingsProps = {
    onCustomSettingsEnd: () => void;
  };

type ResultsProps = {
    toMainMenu: () => void;
};

type stateType = {
    typingSpeed: number;
    numberMistakes: number;
    time: number;
    mode: string;
    typingText: string;
    timeResult: number;
  };