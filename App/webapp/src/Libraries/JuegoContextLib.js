import React, {useState, useEffect, useMemo} from "react";
import {setToken, deleteToken, getToken} from '../Libraries/AuthHelpers';
import Axios from 'axios';

const JuegoContext = React.createContext(null);
const BASE_URL = "http://localhost:44353";

export function JuegoProvider(props) {
    const [id_juego, setJuego] = useState(null);
    const [juegoTemp, setJuegoTemp] = useState(null);

    function cargarJuego(juego) {
        setJuego(juego);
    }

    function cargarJuegoTemp(juegoTemp) {
        setJuegoTemp(juegoTemp);
    }

    const value = useMemo(() => {
        return ({
            id_juego,
            juegoTemp,
            cargarJuego,
            cargarJuegoTemp
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