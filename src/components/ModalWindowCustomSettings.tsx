export type ResultsProps = {
    typingSpeed: number;
    numberMistakes: number;
    time: number;
    toMainMenu: () => void;
}

// to-do udělat možnost vlastního nastavení, to znamená vybrat si režim tedy mode, čas za jak dlouho se to má vykonat, možnost vložit vlastní text, 
const ModalWindowCustomSettings: React.FC<ResultsProps> = ({}) =>{
    return (
        <div>
        </div>
    );
}

export default ModalWindowCustomSettings;