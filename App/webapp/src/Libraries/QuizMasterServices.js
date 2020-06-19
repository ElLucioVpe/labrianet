import Axios from 'axios';
import {useMemo} from "react";
import CrearJuego from "../Views/CrearJuego";

const BASE_URL = "http://localhost:44353"

let config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export function QuizMasterServices() {

    async function crearJuego(props) {
        Axios.post(BASE_URL + '/api/User/crearJuego',
            {
                params: {
                    idJuego: props.idJuego,
                    User_loginnameUser: props.User_loginnameUser,
                    tituloJuego: props.tituloJuego,
                    descripcionJuego: props.descripcionJuego,
                    esPrivadoJuego: props.esPrivadoJuego,
                    coverJuego: props.coverJuego,
                    Musica_idMusica: props.Musica_idMusica,
                    activadoJuego: props.activadoJuego,
                },
                config
            }
        ).then(function (response) {
            return true;
        }).catch(function (error) {
            // handle error
            return false;
        });
    }

    async function crearPregunta(props) {
        Axios.post(BASE_URL + '/api/User/crearPregunta',
            {
                params: {
                    idPregunta: props.idJuego,
                    Juego_idJuego: props.Juego_idJuego,
                    segundosPregunta: props.segundosPregunta,
                    puntosPregunta: props.puntosPregunta,
                    contenidoPregunta: props.contenidoPregunta,
                    tipoPregunta: props.tipoPregunta,
                    urlAyudaPregunta: props.urlAyudaPregunta,
                    startAyuda: props.startAyuda,
                    endAyuda: props.endAyuda,
                    respuestas: [
                        {
                            idRespuesta: props.respuestas.idRespuesta,
                            Pregunta_idPregunta: props.respuestas.Pregunta_idPregunta,
                            esCorrectoRespuesta: props.respuestas.esCorrectoRespuesta,
                            contenidoRespuesta: props.respuestas.contenidoRespuesta,
                        },
                        {
                            idRespuesta: props.respuestas.idRespuesta,
                            Pregunta_idPregunta: props.respuestas.Pregunta_idPregunta,
                            esCorrectoRespuesta: props.respuestas.esCorrectoRespuesta,
                            contenidoRespuesta: props.respuestas.contenidoRespuesta,
                        },
                    ]
                },
                config
            }
        ).then(function (response) {
            return true;
        }).catch(function (error) {
            // handle error
            return false;
        });
    }

    return ({
        crearJuego,
        crearPregunta
    })
}

export default QuizMasterServices