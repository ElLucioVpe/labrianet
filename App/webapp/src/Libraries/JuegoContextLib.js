import React, {useState, useEffect, useMemo} from "react";

const JuegoContext = React.createContext(null);

export function JuegoProvider(props) {
    const [id_juego, setJuego] = useState(null);
    const [juegoTemp, setJuegoTemp] = useState(null);

    const value = useMemo(() => {
        return ({
            id_juego,
            setJuego,
            juegoTemp,
            setJuegoTemp
        })
    }, [id_juego, juegoTemp])

    return <JuegoContext.Provider value={value} {...props}/>
}

export function useJuego() {
    const context = React.useContext(JuegoContext);
    if (!context) {
        throw new Error('useJuego debe estar dentro el proveedor JuegoProvider');
    }
    return context;
}