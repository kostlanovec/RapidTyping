import { createContext, useState } from "react";

type BasicContext = {jmenoHrace: string, toggleJmeno: (jmeno: string) => void, jmenoHracePatyPad: string, toggleJmenoPatyPad: (jmeno: string) => void}

export const BasicContext = createContext<BasicContext>(
    {
        jmenoHrace: "", toggleJmeno() {},
        jmenoHracePatyPad: "", toggleJmenoPatyPad() {}
    }
)

export const BasicProvider: React.FC<React.PropsWithChildren> = ({children}) =>{
    const [jmenoHrace, setJmenoHrace] = useState<string>("");
    const [jmenoHracePatyPad, setJmenoHracePatyPad] = useState<string>("");

    const toggleJmeno = (jmeno: string) =>{
        setJmenoHrace(jmeno);
    }

    const toggleJmenoPatyPad = (jmeno: string) =>{
        setJmenoHracePatyPad(jmeno);
    }

    return (
        <BasicContext.Provider value={{jmenoHrace, toggleJmeno, jmenoHracePatyPad, toggleJmenoPatyPad}}>
            {children}
        </BasicContext.Provider>
    )
}

export default BasicProvider;