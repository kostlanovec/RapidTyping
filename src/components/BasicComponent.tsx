import {useContext, useRef} from "react";
import { BasicContext } from "../providers/BasicProvider";

export const BasicComponent = () =>{
    const { jmenohrace, toggleJmeno} = useContext(BasicContext);
    const inputJmenoRef = useRef<HTMLInputElement>(null);

    const nastaveniJmena = () =>{
        const novejmeno = inputJmenoRef.current?.value;
        if (novejmeno !== undefined){
            toggleJmeno(novejmeno);
        }
        
    }
    return(
        <div>
         <div>
      <label>
        Pošli své jméno
      </label>
      <input type="text" ref={inputJmenoRef} />
      <button onClick={nastaveniJmena}>Poslat</button>

      {jmenohrace && <p>Zdravím, {jmenohrace}!</p>}
    </div>
        </div>
    )
}