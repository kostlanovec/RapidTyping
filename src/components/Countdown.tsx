import React, {useState, useEffect } from 'react'
import { CountDownProps } from '../types/type';

const CountDown: React.FC<CountDownProps> = ({onCountdownEnd}) =>{
    // Tady jsme si definovali, že základní parametr je 3
    const [count, setCount] = useState(3);

    useEffect(() => {
        if(count > 0)
        {
            // odečte 1 po sekundě
            setTimeout(() => setCount(count - 1), 1000);
        }
        else
        {   // odpočet skončil, takže je konec
            onCountdownEnd();
        }
    }, [count]);

    return (
        <p className={`${['countdown']}`}>{count}</p>
    );
}

export default CountDown;