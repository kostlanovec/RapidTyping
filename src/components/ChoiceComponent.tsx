import { useContext } from 'react';
import data from './../Data.json';
import { BasicContext } from '../providers/BasicProvider';

const ChoiceComponent = ({
  handleSelectChangeText = (event: React.ChangeEvent<HTMLSelectElement>) => {},
  handleSelectChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) => {},
  handleSelectChangeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {},
  customSettings = false,
  customSettingButtonClick = () => {},
  handleButtonClick = () => {},
}) => {
  const { jmenohrace } = useContext(BasicContext);

  return (
    <div>
      <h1>Vítej {jmenohrace} v aplikaci Rapid Typing</h1>
      <select className='selectOption' onChange={handleSelectChangeText}>
        {data.TextToTyping.map((option, index) => (
          <option key={index} value={option.mode}>
            {option.mode}
          </option>
        ))}
      </select>
      <select className='selectOption' onChange={handleSelectChangeTime}>
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
      {customSettings && <h2>Window Custom Setting</h2>}
      <button onClick={customSettingButtonClick}>CustomSettings</button>
      <button onClick={handleButtonClick}>Start Countdown</button>
    </div>
  );
};

export default ChoiceComponent;
