import React, {useState, useEffect, useMemo} from "react";

const JuegoContext = React.createContext(null);

export function JuegoProvider(props) {
    const [idJuego, setIdJuego] = useState(null);
    const [juegoTemp, setJuegoTemp] = useState(null);

    const [preguntas, setPreguntas] = useState([{
        titulo: null,
        segundos: null,
        puntaje: null,
        imgUrl: null,
        activo: false,
        respuestaCorrecta: null,
        respuestas: [null, null, null, null]
    }]);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(0);
    const [titulo, setTitulo] = useState("kek");
    const [configurandoRespuesta, setConfigurandoRespuesta] = useState(null);

    const value = useMemo(() => {
        return ({
            idJuego,
            setIdJuego,
            juegoTemp,
            setJuegoTemp,
            preguntas,
            setPreguntas,
            titulo,
            setTitulo
        })
    }, [idJuego, juegoTemp])

    return <JuegoContext.Provider value={value} {...props}/>
}

export function useJuego() {
    const context = React.useContext(JuegoContext);
    if (!context) {
        throw new Error('useJuego debe estar dentro el proveedor JuegoProvider');
    }
    return context;
}