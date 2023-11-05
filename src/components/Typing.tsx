import React, {useState, ChangeEvent } from 'react'

type WinningProps = {
    Winning: () => void;
};

const Typing: React.FC<WinningProps> = ({Winning}) =>{
    const textToTyp = 'Tohle je text, který musíš napsat velice správně a pokud ne, tak ti rozbiju hubu.'

    const [typedText, setTypedText] = useState<string>('');
    const [mistakes, setMistakes] = useState<number>(0);

    // Funkce, která reaguje na změnu hodnoty v input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        if (textToTyp == value){
            console.log('Hurá, vyhrál jsi!');
            Winning();
        }
        setTypedText(value);
    
        let currentMistakes: number = 0;
        for (let i: number = 0; i < value.length; i++) {
          if (value[i] !== textToTyp[i]) {
            currentMistakes++;
          }
        }
        setMistakes(currentMistakes);
      };

    return (
        <div>
          <h2>A teď piš negře</h2>
          <p>{textToTyp}</p>
          <input
            type="text"
            value={typedText}
            onChange={handleInputChange}
          />
          <p>Mistakes: {mistakes}</p>
        </div>
      );
}

export default Typing;