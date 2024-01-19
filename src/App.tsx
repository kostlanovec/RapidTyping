import { useContext, useState } from 'react'
import Countdown from './components/Countdown';
import Typing from './components/Typing';
import Result from './components/Result';
import { BasicComponent } from './components/BasicComponent';
import { BasicContext } from './providers/BasicProvider';
import ChoiceComponent from './components/ChoiceComponent';

function App() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [result, setResult] = useState(false);
  const [numberMistakes, setNumberMistakes] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [text, setText] = useState<string>("test");
  const [mode, setMode] = useState<string>("normal");
  const [customSettings, setCustomSettings] = useState<boolean>(false);
  const {jmenohrace} = useContext(BasicContext);

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
    console.log("bylo kliknuto na custom settings");
    if (customSettings == true){
      setCustomSettings(false)
    }
    else{
      setCustomSettings(true);
    }
  }

  // to-do super by byl multiplayer, byl by závod, kdo by závod udělal rychleji, takže by byla potřeba udělt nějaká roomka, kde organizátor bude říkat, co by tam mohlo být
  // to-do tohle by se dalo udělat obecně, protože se využívá stejných principu
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
      {!jmenohrace &&(
        <BasicComponent />
      )}
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
                  typingSpeed={typingSpeed}
                  numberMistakes={numberMistakes}
                  time={time}
                  toMainMenu={toMainMenu}
                />
              )}
              </div>
      )}
   

  </div>
  )
}

export default App