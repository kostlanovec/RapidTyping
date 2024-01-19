export type ResultsProps = {
    typingSpeed: number;
    numberMistakes: number;
    time: number;
    toMainMenu: () => void;
}

const Result: React.FC<ResultsProps> = ({typingSpeed, numberMistakes, time, toMainMenu}) =>{
    return (
        <div>
        <h2>Tady máš výsledek</h2>
        <p>{typingSpeed} počet znaku za minutu</p>
        <p>{typingSpeed/5} počet slov za minutu</p>
        <p>{numberMistakes} počet chyb</p>
        <p>{time} čas v milisekundách</p>
        <button onClick={toMainMenu}>Hlavní menu</button>
        </div>
    );
}

export default Result;