import React, {useState, useEffect, useMemo} from "react";

const JuegoContext = React.createContext(null);

export function JuegoProvider(props) {
    const [idJuego, setIdJuego] = useState(null);
    const [juegoTemp, setJuegoTemp] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [password, setPassword] = useState(null);
    const [titulo, setTitulo] = useState(null);
    const [idMusica, setIdMusica] = useState(null);
    const [coverJuego, setCoverJuego] = useState(null);
    const [coverEsVideo, setCoverEsVideo] = useState(false);
    const [esPrivadoJuego, setEsPrivadoJuego] = useState(false);
    const [cancionSeleccionada, setCancionSeleccionada] = useState(null);
    const [preguntas, setPreguntas] = useState([{
        titulo: null,
        segundos: null,
        puntaje: null,
        imgUrl: null,
        activo: false,
        respuestaCorrecta: null,
        respuestas: [null, null, null, null]
    }]);

    const eliminarDatos = () => {
        setIdJuego(null);
        setJuegoTemp(null);
        setDescripcion(null);
        setPassword(null);
        setTitulo(null);
        setIdMusica(null);
        setCoverJuego(null);
        setCoverEsVideo(null);
        setEsPrivadoJuego(null);
        setCancionSeleccionada(null);
        setPreguntas([{
            titulo: null,
            segundos: null,
            puntaje: null,
            imgUrl: null,
            activo: false,
            respuestaCorrecta: null,
            respuestas: [null, null, null, null]
        }]);
    }

    const value = useMemo(() => {
        return ({
            idJuego,
            setIdJuego,
            juegoTemp,
            descripcion,
            setDescripcion,
            setJuegoTemp,
            preguntas,
            setPreguntas,
            titulo,
            setTitulo,
            esPrivadoJuego,
            setEsPrivadoJuego,
            password,
            setPassword,
            idMusica,
            setIdMusica,
            cancionSeleccionada,
            setCancionSeleccionada,
            coverJuego,
            setCoverJuego,
            coverEsVideo,
            setCoverEsVideo,
            eliminarDatos
        })
    }, [
        idJuego,
        setIdJuego,
        juegoTemp,
        descripcion,
        setDescripcion,
        setJuegoTemp,
        preguntas,
        setPreguntas,
        titulo,
        setTitulo,
        esPrivadoJuego,
        setEsPrivadoJuego,
        password,
        setPassword,
        idMusica,
        setIdMusica,
        cancionSeleccionada,
        setCancionSeleccionada,
        coverJuego,
        setCoverJuego,
        coverEsVideo,
        setCoverEsVideo
    ]);

    return <JuegoContext.Provider value={value} {...props}/>
}

export function useJuego() {
    const context = React.useContext(JuegoContext);
    if (!context) {
        throw new Error('useJuego debe estar dentro el proveedor JuegoProvider');
    }
    return context;
}