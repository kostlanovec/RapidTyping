import React, {useState, useEffect, useRef} from 'react'
import data from '../Data.json'

type TypingProps = {
  handleButtonResult: (mistakes: number, speed: number, time: number) => void;
  mode:string;
};

const Typing: React.FC<TypingProps> = ({ handleButtonResult, mode }) => {
  const textToTyp = data.optionsToType.find((option) => option.mode === mode)?.text || '';

    const [typedText, setTypedText] = useState<string>('');
    const [mistakes, setMistakes] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);

    // Ref který slouží na to, že člověk může okamžitě psát bez nutnosti na to kliknout. 
    const inputRef = useRef<HTMLInputElement>(null);

      if (textToTyp.length === typedText.length) {
        setTimeout(() => {
          const currentTime = Date.now();
          handleButtonResult(mistakes,calculateTypingSpeed(currentTime, startTime, textToTyp.length),currentTime - startTime
          );
        });
      };

    // Funkce, která reaguje na změnu hodnoty v input
    const handleInputChange = () => {
      if (inputRef.current) {
        const value = inputRef.current.value;
        setTypedText(value);
  
        let currentMistakes: number = 0;
        for (let i: number = 0; i < value.length; i++) {
          if (value[i] !== textToTyp[i]) {
            currentMistakes++;
          }
        }
        setMistakes(currentMistakes);
      }
    };
  
      const calculateTypingSpeed = (endTime: number, startTime: number, textLength: number) => {
        const timeInMinutes = (endTime - startTime) / 60000;
        const charactersPerMinute = textLength / timeInMinutes;
        return charactersPerMinute;
      };

      useEffect(() => {
        if (startTime === 0) {
          setStartTime(Date.now());
        }
      }, [startTime]);

      const renderTextWithHighlights = () => {
        return textToTyp.split('').map((char, index) => {
          if (typedText[index] === undefined) {
            return <span style={{ color: 'black' }}>{char}</span>;
          } else if (typedText[index] === char) {
            return <span style={{ color: 'green' }}>{char}</span>;
          } else {
            return <span style={{ color: 'red' }}>{char}</span>;
          }
        });
      };
    
      return (
        <div>
          <h2>A teď piš negře</h2>
          <p>{renderTextWithHighlights()}</p>
          <input className='wordsInputs' ref={inputRef} type="text" value={typedText} onChange={handleInputChange}  autoFocus/>
          <p>Mistakes: {mistakes}</p>
        </div>
      );  
}

export default Typing;