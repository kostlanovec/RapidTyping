// ModalWindowCustomSettings.tsx
import React, { useContext, useState } from 'react';
import { PlayingContext } from '../providers/PlayingProvider';

export type CustomSettingsProps = {
  onCustomSettingsEnd: () => void;
};

const ModalWindowCustomSettings: React.FC<CustomSettingsProps> = ({ onCustomSettingsEnd}) => {
    const {setMode, setTypingText, typingText, setTime, mode, time} = useContext(PlayingContext);

  const handleSaveButtonClick = () => {
    // Validate input if needed
    onCustomSettingsEnd();
  };

  return (
    <div>
      <h2>Vlastní nastavení</h2>
      <p>Režim</p>
      <input type='text' value={mode} onChange={(e) => setMode(e.target.value)} />
      <p>Čas</p>
      <input type='number' value={time} onChange={(e) => setTime(Number(e.target.value))} />
      <p>Text</p>
      <textarea value={typingText} onChange={(e) => setTypingText(e.target.value)}></textarea>
      <button onClick={handleSaveButtonClick}>Uložit</button>
    </div>
  );
};

export default ModalWindowCustomSettings;
