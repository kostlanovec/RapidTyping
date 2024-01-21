import React, { useContext, useState} from 'react';
import { PlayingContext } from '../providers/PlayingProvider';
import data from "../Data.json"

export type CustomSettingsProps = {
  onCustomSettingsEnd: () => void;
};

const ModalWindowCustomSettings: React.FC<CustomSettingsProps> = ({ onCustomSettingsEnd}) => {
    const {setMode, setTypingText, typingText, setTime, mode, time} = useContext(PlayingContext);
    const [randomTextLength, setRandomTextLength] = useState<number>(50);

  const handleSaveButtonClick = () => {
    onCustomSettingsEnd();
  };

  const handleSelectChangeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const generateRandomText = (length: number): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomText = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters.charAt(randomIndex);
    }
  
    return randomText;
  };

  const handleGenerateRandomText = () => {
    const generatedText = generateRandomText(randomTextLength);
    setTypingText(generatedText);
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
      <input type='number' value={time} onChange={(e) => setTime(Number(e.target.value))} />
      <p>Text</p>
      <textarea value={typingText} onChange={(e) => setTypingText(e.target.value)}></textarea>
      <p>Délka náhodného textu</p>
      <input
        type='number'
        value={randomTextLength}
        onChange={(e) => setRandomTextLength(Number(e.target.value))}
      />
      <button onClick={handleGenerateRandomText}>Generovat náhodný text</button>
      <button onClick={handleSaveButtonClick}>Uložit</button>
    </div>
  );
};

export default ModalWindowCustomSettings;