import { useContext, useState } from "react";
import { BasicContext } from "../providers/BasicProvider";

export const BasicComponent = () => {
    const {
      toggleJmeno,
      toggleJmenoPatyPad,
    } = useContext(BasicContext);
  
    const [showInputJmenoPatyPad, setShowInputJmenoPatyPad] = useState<boolean>(false);
    const [inputJmenoHrace, setInputJmenoHrace] = useState<string>("");
    const [inputJmenoHracePatyPad, setInputJmenoHracePatyPad] = useState<string>("");
  
    const handleCheckboxChange = () => {
      setShowInputJmenoPatyPad(!showInputJmenoPatyPad);
    };
  
    const ButtonAction = () => {
      toggleJmeno(inputJmenoHrace);
      if (showInputJmenoPatyPad) {
        toggleJmenoPatyPad(inputJmenoHracePatyPad);
      }
      else{
        toggleJmenoPatyPad(inputJmenoHrace);
      }
    };


  return (

      <div className={`${['inputWindow']}`}>
        <h1>Vyplň své jméno</h1>
        <p>Děláme žebříček nejlepších pisatelů, kteří se pokouší pokořit rapid typing!</p>
        <div className={`${['inputWindow__div']}`}>
            <p className={`${['inputWindow__header']}`}>Jméno hráče</p>
        <input
          type="text"
          required
          value={inputJmenoHrace}
          onChange={(e) => {
            setInputJmenoHrace(e.target.value);
          }}
          className={`${['form__input']}`}
        />
        </div>

        {showInputJmenoPatyPad && (
            <div className={`${['inputWindow__div']}`}>
                <p className={`${['inputWindow__header']}`}>Páty pád jména</p>
            <input
              type="text"
              value={inputJmenoHracePatyPad}
              required
              onChange={(e) => {
                setInputJmenoHracePatyPad(e.target.value);
              }}
              className={`${['form__input']}`}
            />
            </div>
        )}

        <label className={`${['inputWindow__label']}`}>
          <input
            type="checkbox"
            checked={showInputJmenoPatyPad}
            onChange={handleCheckboxChange}
          />
          Nepoužít stejné jméno jako v pátem pádě
        </label>
        <div>
        <button className={`${['button']}`} onClick={ButtonAction}>
        Poslat
      </button>
      </div>
      </div>
  );
};
