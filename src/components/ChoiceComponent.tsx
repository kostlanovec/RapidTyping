import { useContext } from 'react';
import data from './../Data.json';
import { BasicContext } from '../providers/BasicProvider';
import ModalWindowCustomSettings from './CustomSettings';
import { PlayingContext } from '../providers/PlayingProvider';

const ChoiceComponent = ({
  customSettings = false,
  customSettingButtonClick = () => {},
  handleButtonClick = () => {},
}) => {
  const { jmenohrace } = useContext(BasicContext);
  const {setMode, setTime, setTypingText, typingText, time} = useContext(PlayingContext);

  const handleSelectChangeText = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = event.target.value;
    
    const selectedText = data.TextToTyping.find(option => option.mode === selectedMode)?.text;
  
    if (selectedText !== undefined) {
      setTypingText(selectedText);
 }
  };

  const handleSelectChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    const selectedTime = Number(event.target.value);
    setTime(selectedTime);
  }

  const handleSelectChangeMode = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    const selectedTime = event.target.value;
    setMode(selectedTime);
  }
  return (
    <div>
            {customSettings && (
        <ModalWindowCustomSettings
          onCustomSettingsEnd={customSettingButtonClick}
        />
      )}
            {!customSettings &&
            <div>
            <h1>Vítej {jmenohrace} v aplikaci Rapid Typing</h1>
            <select className='selectOption' onChange={handleSelectChangeText} value={typingText}>
              {data.TextToTyping.map((option, index) => (
                <option key={index} value={option.mode}>
                  {option.mode}
                </option>
              ))}
            </select>
            <select className='selectOption' onChange={handleSelectChangeTime} value={time}>
              {data.ModeTimeTyping.map((option, index) => (
                <option key={index} value={option.time}>
                  {option.time}
                </option>
              ))}
            </select>
            <select className='selectOption' onChange={handleSelectChangeMode}>
              {data.ModePlay.map((option, index) => (
                <option key={index} value={option.mode}>
                  {option.mode}
                </option>
              ))}
            </select>
            <button onClick={customSettingButtonClick}>Vlastní nastavení</button>
            </div>
            }
            <button onClick={handleButtonClick}>Start</button>
      
    </div>
  );
};

export default ChoiceComponent;