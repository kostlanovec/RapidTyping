import { createContext, useState } from "react";

type BasicContext = {jmenohrace: string, toggleJmeno: (jmeno: string) => void}

export const BasicContext = createContext<BasicContext>(
    {
        jmenohrace: "Chlapec", toggleJmeno(jmeno: string) {},
    }
)

export const BasicProvider: React.FC<React.PropsWithChildren> = ({children}) =>{
    const [jmenohrace, setJmenoHrace] = useState<string>("");

    const toggleJmeno = (jmeno: string) =>{
        setJmenoHrace(jmeno);
    }

    return (
        <BasicContext.Provider value={{jmenohrace, toggleJmeno}}>
            {children}
        </BasicContext.Provider>
    )
}

export default BasicProvider;