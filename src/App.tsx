import React, { useContext, useState } from 'react';
import Countdown from './components/Countdown';
import Typing from './components/Typing';
import Result from './components/Result';
import { BasicComponent } from './components/BasicComponent';
import { BasicContext } from './providers/BasicProvider';
import ChoiceComponent from './components/ChoiceComponent';
import StatisticProvider, { StatisticContext } from './providers/StatisticProvider';

function App() {
  const { jmenohrace } = useContext(BasicContext);
  const [customSettings, setCustomSettings] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [text, setText] = useState<string>("test");
  const {
    time,
    setTime,
    setMode,
    setNumberMistakes,
    setTypingSpeed,
    mode,
  } = useContext(StatisticContext);

  const handleButtonClick = () =>{
    setShowCountdown(true);
  }

  const handleButtondownEnd = () =>{
    setShowCountdown(false);
    setGameStart(true);
    }

    const handleButtonResult = (mistakes: number, speed: number, timeTaken: number) => {
      setNumberMistakes(mistakes);
      setTypingSpeed(speed);
      setTime(timeTaken);
      setResult(true);
      setTime(0);
    };
    

  const toMainMenu = () =>{
   setGameStart(false);
   setResult(false);
  }

  const customSettingButtonClick = () =>{
    if (customSettings == true){
      setCustomSettings(false)
    }
    else{
      setCustomSettings(true);
    }
  }

  const handleSelectChangeText = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = event.target.value;
    setText(selectedMode);
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
      {!jmenohrace && <BasicComponent />}
  
      {jmenohrace && (
        <div>
          {!showCountdown && !gameStart && (
            <ChoiceComponent
              handleSelectChangeText={handleSelectChangeText}
              handleSelectChangeTime={handleSelectChangeTime}
              handleSelectChangeMode={handleSelectChangeMode}
              customSettings={customSettings}
              customSettingButtonClick={customSettingButtonClick}
              handleButtonClick={handleButtonClick}
            />
          )}
          {showCountdown && <Countdown onCountdownEnd={handleButtondownEnd} />}
          {gameStart && !result && <Typing handleButtonResult={handleButtonResult} text={text} time={time} mode={mode} />}
          {result && (
  <Result
    toMainMenu={toMainMenu}
  />
)}

        </div>
      )}
    </div>
  );
}

export default App;
