import React, {useState, useEffect, useRef} from 'react'

type TypingProps = {
  handleButtonResult: (mistakes: number, speed: number, time: number) => void;
};

const Typing: React.FC<TypingProps> = ({ handleButtonResult }) => {
    const textToTyp = 'Tohle je text, který musíš napsat velice správně a pokud ne, tak ti rozbiju hubu.'

    const [typedText, setTypedText] = useState<string>('');
    const [mistakes, setMistakes] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);

    // Ref který slouží na to, že člověk může okamžitě psát bez nutnosti na to kliknout. 
    const inputRef = useRef<HTMLInputElement>(null);

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

      
      /* problém je asynchronní operace javascriptu a taky nevím, jestli useEffect na to, že je konec hry je vhodný*/
      useEffect(() => {
        if (textToTyp.length === typedText.length) {
          setTimeout(() => {
            const currentTime = Date.now() - 50; //počítano i s prodlevou
            handleButtonResult(mistakes,calculateTypingSpeed(currentTime, startTime, textToTyp.length),currentTime - startTime
            );
          }, 50); // nevím, prostě počkáme 50 milisekund
        }
      }, [typedText, textToTyp, mistakes, startTime, handleButtonResult]);
    
      return (
        <div>
          <h2>A teď piš negře</h2>
          <p>{renderTextWithHighlights()}</p>
          <input ref={inputRef} type="text" value={typedText} onChange={handleInputChange} />
          <p>Mistakes: {mistakes}</p>
        </div>
      );

      
}

export default Typing;