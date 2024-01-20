import React, {useState, useEffect, useRef, useReducer, useContext} from 'react'
import data from '../Data.json'
import { StatisticContext } from '../providers/StatisticProvider';

type TypingProps = {
  handleButtonResult: (mistakes: number, speed: number, time: number) => void;
  text:string;
  time:number;
  mode:string;
};

type Action =
  {type:"normal";} |
  {type: "fastlook"} |
  {type: "onemistake"} |
  {type: "bettertyping"}

function reducer(state:string, action:Action){
  switch (action.type) {
    case "normal":{
      return{
      };
    }
    case "fastlook":{
      return{

      };
    }
    case "onemistake":{
      return{
      };
    }
      case "bettertyping":{
        return{

        }
    }
}
}

const Typing: React.FC<TypingProps> = ({ handleButtonResult, text}) => {
  const textToTyp = data.TextToTyping.find((option) => option.mode === text)?.text || '';
  const { numberMistakes, setNumberMistakes, setTypingSpeed, time, mode,  setTime } = useContext(StatisticContext);

  /*const [state,  dispatch] = useReducer(reducer, mode);*/

  const [typedText, setTypedText] = useState<string>('');
  const [numberMistakesSpaces, setNumberMistakesSpaces] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeToWrite, setTimeToWrite] = useState<number>(time);

    // Ref který slouží na to, že člověk může okamžitě psát bez nutnosti na to kliknout. 
  const inputRef = useRef<HTMLInputElement>(null);
  const typedWordsCount = typedText.split(/\s+/).filter(word => word !== '').length;

// Spočítat počet slov v původním textu
const originalWordsCount = textToTyp.split(/\s+/).filter(word => word !== '').length;

    const calculateTypingSpeed = (endTime: number, startTime: number, textLength: number) => {
      const timeInMinutes = (endTime - startTime) / 60000;
      const charactersPerMinute = textLength / timeInMinutes;
      setTypingSpeed(charactersPerMinute);
      return charactersPerMinute;
    };

    // Porovnat počty slov
if (typedWordsCount === originalWordsCount) {
  const currentTime = Date.now();
  setTime(startTime - currentTime);
  handleButtonResult(
    numberMistakes,
    calculateTypingSpeed(currentTime, startTime, textToTyp.length),
    currentTime - startTime
  );
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (inputRef.current) {
    let numberOfCharacters = 0;
    const value = event.target.value;
    console.log(value);
    const lastChar = value[value.length - 1];
    console.log(lastChar);

    // Zkontrolujte, zda je poslední znak mezerou a zda se vstupní text liší od očekávaného textu
    if (/\s/.test(lastChar) && value.trim() !== textToTyp.slice(0, value.length - 1).trim()) {

      // Získání zbývajícího textu k napsání
      const remainingText = textToTyp.slice(value.length);
      const nextSpaceIndex = remainingText.indexOf(' ');

      /*const nextCharAfterInput = textToTyp[value.length];*/
      if (nextSpaceIndex !== -1 && /*nextCharAfterInput === ' ' && */value.lastIndexOf(' ') === value.length - 1) {
        const nextWord = remainingText.slice(0, nextSpaceIndex);
        numberOfCharacters = nextWord.length;

        console.log(`Skipped word: ${nextWord}`);

        setTypedText(value + nextWord + ' ');
        inputRef.current.setSelectionRange(value.length + nextWord.length + 1, value.length + nextWord.length + 1);

        // Připočítání znaků nextWord jako chyby
        setNumberMistakesSpaces((prevmistakes) => prevmistakes + nextWord.length)
      }
    } else {
      setTypedText(value);

      // Počítání chyb - připočítat 1 za každý nesprávně napsaný znak
      let currentMistakes = 0;
      for (let i = 0; i < value.length; i++) {
        if (textToTyp[i] !== value[i]) {
          currentMistakes++;
        }
      }
      setNumberMistakes(currentMistakes + numberMistakesSpaces);
    }
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
            handleButtonResult(numberMistakes,calculateTypingSpeed(currentTime, startTime, textToTyp.length),currentTime - startTime
            );
          }
        }, [timeToWrite, setTimeToWrite ] );
      }

      // to-do kde bych měl mít definovaný barvy v reactu.
      const renderTextWithHighlights = () => {
        return textToTyp.split('').map((char, index) => {
          if (typedText[index] === undefined) {
            // Označit jako červené písmeno, pokud je skipped word
            const isSkippedWord = index < typedText.length && typedText[index] !== char;
            return <span style={{ color: isSkippedWord ? 'red' : 'var(--textcolornormal);' }}>{char}</span>;
          } else if (typedText[index] === char) {
            return <span style={{ color: '#efeffb' }}>{char}</span>;
          } else {
            return <span style={{ backgroundColor: 'red' }}>{char}</span>;
          }
        });
      };
      return (
        <div>
          {timeToWrite !== 0 && <div className='timetowrite'>{timeToWrite}</div>}
        <input className='wordsInputs' ref={inputRef} type="text" value={typedText} onChange={handleInputChange} autoFocus />
        <p>Mistakes: {numberMistakes}</p>
        <div className='container__texttowrite'>
        <p className='texttowrite'>{renderTextWithHighlights()}</p>
        </div>
      </div>
      );  
 }

export default Typing;