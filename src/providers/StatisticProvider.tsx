import { createContext, useState } from "react";

type StatisticContext = {jmenohrace: string, toggleJmeno: (jmeno: string) => void}

export const StatisticContext = createContext<StatisticContext>(
    {
        jmenohrace: "", toggleJmeno() {},
    }
)

export const StatisticProvider: React.FC<React.PropsWithChildren> = ({children}) =>{
    const [jmenohrace, setJmenoHrace] = useState<string>("");

    const toggleJmeno = (jmeno: string) =>{
        setJmenoHrace(jmeno);
    }

    return (
        <StatisticContext.Provider value={{jmenohrace, toggleJmeno}}>
            {children}
        </StatisticContext.Provider>
    )
}

export default StatisticProvider;