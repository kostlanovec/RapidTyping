import React, { useContext } from 'react';
import { PlayingContext } from '../providers/PlayingProvider';
import { ResultsProps } from '../types/type';


const Result: React.FC<ResultsProps> = ({ toMainMenu }) => {
  const [ {typingSpeed, numberMistakes, timeResult, typingText, time}  ] = useContext(PlayingContext);
  const netWordsPerMinute = Math.round((typingText.length - numberMistakes) / time * 60)

  return (
    <div>
      <h2>Tady máš výsledek</h2>
      <p>{typingSpeed} počet znaků za minutu</p>
      <p>{typingSpeed / 5} počet slov za minutu</p>
      <p>{numberMistakes} počet chyb</p>
      <p>{timeResult} čas v milisekundách</p>
      <p>{netWordsPerMinute} Čisté úhozy za minutu</p>
      <button onClick={toMainMenu}>Hlavní menu</button>
    </div>
  );
};

export default Result;