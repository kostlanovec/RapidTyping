import React, {useState, useEffect, useRef, useContext} from 'react'
import { PlayingContext } from '../providers/PlayingProvider';

type TypingProps = {
  handleButtonResult: (mistakes: number, speed: number, time: number) => void;
  text:string;
  time:number;
  mode:string;
};

const Typing: React.FC<TypingProps> = ({ handleButtonResult}) => {
  const { numberMistakes, setNumberMistakes, setTypingSpeed, setTimeResult, typingText, time, mode } = useContext(PlayingContext);
  const [typedText, setTypedText] = useState<string>('');
  const [numberMistakesSpaces, setNumberMistakesSpaces] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeToWrite, setTimeToWrite] = useState<number>(time);
  const [indexTyping, setIndexTyping] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(0);

    // Ref který slouží na to, že člověk může okamžitě psát bez nutnosti na to kliknout. 
  const inputRef = useRef<HTMLInputElement>(null);
  const typedWordsCount = typedText.split(/\s+/).filter(word => word !== '').length;

// Spočítat počet slov v původním textu
const originalWordsCount = typingText.split(/\s+/).filter(word => word !== '').length;

    const calculateTypingSpeed = (endTime: number, startTime: number, textLength: number) => {
      const timeInMinutes = (endTime - startTime) / 60000;
      const charactersPerMinute = textLength / timeInMinutes;
      setTypingSpeed(charactersPerMinute);
      return charactersPerMinute;
    };


const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (inputRef.current) {
    const value = event.target.value;
    setIndexTyping(value.split(/\s+/).length - 1)

    if (typedWordsCount === originalWordsCount || value.length  === typingText.length) {
      const lastWord = value.trim().split(' ').pop();
      const lastWordCharacterCount = lastWord ? lastWord.length : 0;
      const lastWordrequired = typingText.trim().split(" ").pop();
      
      if (lastWordCharacterCount === lastWordrequired?.length || value.length  === typingText.length) {
        const currentTime = Date.now();
        setTimeResult((currentTime - startTime)/10);
        handleButtonResult(
          numberMistakes,
          calculateTypingSpeed(currentTime, startTime, typingText.length),
          currentTime - startTime
        );
    }
  }
    
    if (value.lastIndexOf(" ")){
      setLastIndex(value.length)

      // Získání zbývajícího textu k napsání
      const remainingText = typingText.slice(value.length);
      const nextSpaceIndex = remainingText.indexOf(' ');

      if (nextSpaceIndex !== -1 && value.lastIndexOf(' ') === value.length - 1 && nextSpaceIndex !== -1 && typingText[value.length - 1] !==  " ") {
        const nextWord = remainingText.slice(0, nextSpaceIndex);
        setTypedText(value + nextWord + " ");
        inputRef.current.setSelectionRange(value.length + nextWord.length + 1, value.length + nextWord.length);
        // Připočítání znaků nextWord jako chyby
        setNumberMistakesSpaces((prevmistakes) => prevmistakes + nextWord.length)
      }
    else {
      setLastIndex(value.length)
      setTypedText(value);
      // Počítání chyb - připočítat 1 za každý nesprávně napsaný znak
      let currentMistakes = 0;
      for (let i = 0; i < value.length; i++) {
        if (typingText[i] !== value[i]) {
          currentMistakes++;
        }
      }
      if (mode == "onemistake"){
        if (currentMistakes === 1){
          handleButtonResult(numberMistakes, 0, 0);
        }
      }
      setNumberMistakes(currentMistakes + numberMistakesSpaces);
      
    }}}
};

const renderModeSpecificContent = () => {
  switch (mode) {
    case 'classic':
      break;
    case 'onemistake':
      break;
    case 'fastlook':
      const currentWordToWrite = typingText.split(" ")[indexTyping];
      return <div className="current-word--towrite">{currentWordToWrite}</div>;
    case 'bettertyping':
      break;
    default:
      break;
  }
};

    useEffect(() => {
      if (startTime === 0) {
        setStartTime(Date.now());
      }
    }, [startTime]);

    if (time !== 0){
      useEffect(() => {
        if(timeToWrite > 0)
          {

              setTimeout(() => setTimeToWrite(timeToWrite - 1), 1000);
          }
          if(timeToWrite === 0)
          {   // odpočet skončil, takže je konec
            const currentTime = Date.now();
            handleButtonResult(numberMistakes,calculateTypingSpeed(currentTime, startTime, typingText.length),currentTime - startTime
            );
          }
        }, [timeToWrite, setTimeToWrite ] );
      }

      const renderTextWithHighlights = () => {
      
        return typingText.split('').map((char, index) => {
          if (index < lastIndex) {
            if (char === typedText[index]) {
              return (
                <span style={{ color: '#efeffb' }}>
                  {char}
                </span>
              );
            } else {
              return (
                <span style={{color: 'red'}}>
                  {char}
                </span>
              );
            }
          } else if (typedText[index] === undefined) {
            return (
              <span>
                {char}
              </span>
            );
          } else if (typedText[index] === char) {
            return (
              <span style={{ backgroundColor: 'red' }}>
                {char}
              </span>
            );
          }
        });
      };
      
      return (
      <div>
        <div>
      {timeToWrite !== 0 && <div className="timetowrite">{timeToWrite}</div>}
      <input className="wordsInputs" ref={inputRef} type="text" value={typedText} onChange={handleInputChange} autoFocus />
      <p>Mistakes: {numberMistakes}</p>
      <div className="container__texttowrite">
      <p className="texttowrite">
        {mode === "normal" ? renderTextWithHighlights() : renderModeSpecificContent()}
      </p>
      </div>
    </div>
      </div>
      );  
 }

export default Typing;