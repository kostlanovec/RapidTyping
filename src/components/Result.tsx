import React, { useContext } from 'react';
import { PlayingContext } from '../providers/PlayingProvider';


export type ResultsProps = {
    toMainMenu: () => void;
};

const Result: React.FC<ResultsProps> = ({ toMainMenu }) => {
  const { typingSpeed, numberMistakes, timeResult } = useContext(PlayingContext);
  return (
    <div>
      <h2>Tady máš výsledek</h2>
      <p>{typingSpeed} počet znaků za minutu</p>
      <p>{typingSpeed / 5} počet slov za minutu</p>
      <p>{numberMistakes} počet chyb</p>
      <p>{timeResult} čas v milisekundách</p>
      <button onClick={toMainMenu}>Hlavní menu</button>
    </div>
  );
};

export default Result;