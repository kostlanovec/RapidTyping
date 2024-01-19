import {useContext, useRef} from "react";
import { BasicContext } from "../providers/BasicProvider";

export const BasicComponent = () =>{
    const { jmenohrace, toggleJmeno} = useContext(BasicContext);
    const inputJmenoRef = useRef(null)


    const nastaveniJmena = () =>{
        const novejmeno = inputJmenoRef.current.value;
        if (novejmeno !== undefined){
            toggleJmeno(novejmeno);
        }
        
    }
    return(
        <div>
         <div>
      <label>
        Enter your name:
        <input type="text" ref={inputJmenoRef} />
      </label>
      <button onClick={nastaveniJmena}>Submit</button>

      {jmenohrace && <p>Hello, {jmenohrace}!</p>}
    </div>
        </div>
    )
}