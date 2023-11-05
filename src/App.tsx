import { useState } from 'react'
import './App.css'
import Countdown from './components/Countdown';
import Typing from './components/Typing';
import Result from './components/Result';

function App() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [result, setResult] = useState(false);

  const handleButtonClick = () =>{
    setShowCountdown(true);
  }

  const handleButtondownEnd = () =>{
    setShowCountdown(false)
    setGameStart(true);
    }

  const handleButtonResult = () =>{
    setResult(true);
  }

  console.log(showCountdown);
  console.log(gameStart);
  return (
    <div>
    {!showCountdown && !gameStart && (
  <div>
    <h1>Vítej do aplikace Rapid Typing</h1>
    <button onClick={handleButtonClick}>Start Countdown</button>
  </div>
)}
        {showCountdown && <Countdown onCountdownEnd={handleButtondownEnd} />}
        {gameStart && !result && <Typing Winning={handleButtonResult} />}
        {result && <Result />}

  </div>
  )
}

export default App
