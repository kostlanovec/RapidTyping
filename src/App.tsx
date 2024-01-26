import { useContext, useState } from 'react';
import Countdown from './components/Countdown';
import Typing from './components/Typing';
import Result from './components/Result';
import { BasicComponent } from './components/BasicComponent';
import { BasicContext } from './providers/BasicProvider';
import ChoiceComponent from './components/ChoiceComponent';
import PlayingProvider, { PlayingContext } from './providers/PlayingProvider';

function App() {
  const {jmenoHrace, jmenoHracePatyPad } = useContext(BasicContext);
  const [customSettings, setCustomSettings] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);
  const [{time, mode}, dispatch] = useContext(PlayingContext);

  const handleButtonClick = () =>{
    setShowCountdown(true);
  }

  const handleButtondownEnd = () =>{
    setShowCountdown(false);
    setGameStart(true);
    }

    const handleButtonResult = (mistakes: number, speed: number, timeTaken: number) => {
      setResult(true);
      dispatch({type: 'SET_TIME', payload: timeTaken});
      dispatch({type: 'SET_TYPING_SPEED', payload: speed});
      dispatch({type: 'SET_NUMBER_MISTAKES', payload: mistakes});
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


  return (
    <PlayingProvider>
    <div>
      {!jmenoHrace && !jmenoHracePatyPad && <BasicComponent />}
  
      {jmenoHrace && jmenoHracePatyPad && (
        <>
          {!showCountdown && !gameStart && (
            <ChoiceComponent
              customSettings={customSettings}
              customSettingButtonClick={customSettingButtonClick}
              handleButtonClick={handleButtonClick}
            />
          )}
          {showCountdown && <Countdown onCountdownEnd={handleButtondownEnd} />}
          {gameStart && !result && <Typing handleButtonResult={handleButtonResult} time={time} mode={mode} text={""}/>}
          {result && (
  <Result
    toMainMenu={toMainMenu}
  />
)}
        </>
      )}
      
    </div>
    </PlayingProvider>
  );
}

export default App;
