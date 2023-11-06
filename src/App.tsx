import { useState } from 'react'
import './App.css'
import Countdown from './components/Countdown';
import Typing from './components/Typing';
import Result from './components/Result';

function App() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [result, setResult] = useState(false);
  const [numberMistakes, setNumberMistakes] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const handleButtonClick = () =>{
    setShowCountdown(true);
  }

  const handleButtondownEnd = () =>{
    setShowCountdown(false)
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

  console.log(showCountdown);
  console.log(gameStart);
  console.log(numberMistakes);
  console.log(typingSpeed);
  console.log(time);
  return (
    <div>
    {!showCountdown && !gameStart && (
  <div>
    <h1>Vítej do aplikace Rapid Typing</h1>
    <button onClick={handleButtonClick}>Start Countdown</button>
  </div>
)}
        {showCountdown && <Countdown onCountdownEnd={handleButtondownEnd} />}
        {gameStart && !result && <Typing handleButtonResult={handleButtonResult} />}
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