import { useState } from 'react'
import './App.css'
import Countdown from './components/Countdown';
import Typing from './components/Typing';
import Result from './components/Result';
import data from './Data.json';

function App() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [result, setResult] = useState(false);
  const [numberMistakes, setNumberMistakes] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [mode, setMode] = useState<string>("test"); // nastavení defaultně na test i z toho důvodu, že je první

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
    };
    

  const toMainMenu = () =>{
   setGameStart(false);
   setResult(false);
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <div>
    {!showCountdown && !gameStart && (
  <div>
    <h1>Vítej v aplikaci Rapid Typing</h1>
    <select onChange={handleSelectChange}>
        {data.optionsToType.map((option, index) => (
          <option key={index} value={option.mode}>
            {option.mode}
          </option>
        ))}
      </select>
    <button onClick={handleButtonClick}>Start Countdown</button>
  </div>
)}
        {showCountdown && <Countdown onCountdownEnd={handleButtondownEnd} />}
        {gameStart && !result && <Typing handleButtonResult={handleButtonResult} mode={mode} />}
        {result && (
        <Result
          typingSpeed={typingSpeed}
          numberMistakes={numberMistakes}
          time={time}
          toMainMenu={toMainMenu}
        />
      )}

  </div>
  )
}

export default App