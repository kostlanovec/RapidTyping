import React, { useContext, useState} from 'react';
import { PlayingContext } from '../providers/PlayingProvider';
import data from "../Data.json"
import { CustomSettingsProps } from '../types/type';

const CustomSettings: React.FC<CustomSettingsProps> = ({ onCustomSettingsEnd}) => {
    const [{typingText, mode, time}, dispatch ] = useContext(PlayingContext);
    const [randomTextLength, setRandomTextLength] = useState<number>(50);

  const handleBackMainMenu = () => {
    onCustomSettingsEnd();
  };

  const handleSelectChangeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = e.target.value;
    dispatch({type: 'SET_MODE', payload: selectedMode});
  };

  const generateRandomText = (length: number): string => {
    // to by se kdyžtak mohlo generovat z ansi tabulky
    const characters = 'abcdefghijklmnopqrstuvwxyz áčďéěíňóřšťúůýž!@#$%^&*()_+-=[]{}|;:,.<>?/1234567890 ';
    let randomText = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters.charAt(randomIndex);
    }
  
    return randomText;
  };

  const handleGenerateRandomText = () => {
    const generatedText = generateRandomText(randomTextLength);
    dispatch({type: 'SET_TYPING_TEXT', payload: generatedText});
  };

  return (
    <div>
      <h2>Vlastní nastavení</h2>
      <p>Režim</p>
      <select value={mode} onChange={handleSelectChangeMode}>
        {data.ModePlay.map((option, index) => (
          <option key={index} value={option.mode}>
            {option.mode}
          </option>
        ))}
      </select>
      <p>Čas</p>
      <input type="number" value={time} onChange={(e) => dispatch({type: 'SET_TIME', payload: Number(e.target.value)})} />
      
      <p>Text</p>
      <textarea value={typingText} onChange={(e) => dispatch({type: 'SET_TYPING_TEXT', payload: e.target.value})}></textarea>
      <p>Délka náhodného textu</p>
      <input
        type='number'
        value={randomTextLength}
        onChange={(e) => setRandomTextLength(Number(e.target.value))}
      />
      <button onClick={handleGenerateRandomText}>Generovat náhodný text</button>
      <button onClick={handleBackMainMenu}>Zpět do menu</button>
    </div>
  );
};

export default CustomSettings;