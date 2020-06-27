import React, {useEffect, useState} from 'react'
import '../Css/Juego.css'
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useUsuario} from "../Libraries/UserContextLib";
import Button from "../Components/Button";
const BASE_URL = "http://localhost:44353";

export default function Juego(props) {
    const usuario = useUsuario();
    const [nickname, setNickname] = useState("Anonimo");
    const [info_juego, setInfo_juego] = useState([]);
    const [puntuacion, setPuntuacion] = useState(0);
    const [numeroPregunta, setNumeroPregunta] = useState(1);
    const [numeroRespuesta, setNumeroRespuesta] = useState(-1);
    const [preguntaActual, setPreguntaActual] = useState("");
    const [contesta, setContesta] = useState([]);
    const [counter, setCounter] = useState(-1);
    const [counterPausa, setCounterPausa] = useState(0);
    const [verGrafica, setVerGrafica] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    useEffect(() => {
        async function cargarJuego() {
            await QuizMasterService.obtenerJuego(props.match.params.id).then(
                function (data) {
                    console.log(data);
                    setInfo_juego(data);
                    setPreguntaActual(data.preguntas[0]);
                    setCounter(parseInt(data.preguntas[0].segundosPregunta));
                }
            ).catch(function (error) {
                // handle error
                //window.location = "/";
            });
        }
        cargarJuego()

    }, []);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => {
            if(!verGrafica) {
                if(counterPausa !== 0) {
                    setCounterPausa(0);
                    setCounter(counterPausa);
                }
                else setCounter(counter - 1);
            }
            else {
                if(counterPausa === 0) setCounterPausa(counter);
                setCounter(counter+1);
            }
            }
            , 1000);
        if(counter === 0 && !verGrafica) mostrarGrafica();//Se le acaba el tiempo
        return () => clearInterval(timer);
    }, [counter]);

    const handleClickRespuesta = ((nroRespuesta) => {
        setNumeroRespuesta(nroRespuesta);
    });

    const terminarJuego = (async () => {
        var dataPartida = {
            "Juego_idJuego": info_juego.idJuego,
            "nickUsuario": nickname
        };
        if(usuario.inicioSesion) dataPartida["User_loginnameUser"] = usuario.usuario;

        var idPartida = await QuizMasterService.crearPartida(dataPartida);
        //Creo la relacion con las preguntas
        let respuestasRespondidas;
        contesta.forEach(respuestasRespondidas = async function (item, i) {
            let exito = await QuizMasterService.respuestaRespondida(item.idRespuesta, idPartida);
            console.log(exito);
        });
        setJuegoTerminado(true); //para evitar se ejecute multiples veces
        window.location = '/playerRanking/'+info_juego.idJuego;
    });

    const chequeo = (() => {
        if(info_juego.preguntas && (numeroPregunta > info_juego.preguntas.length) && !juegoTerminado && !verGrafica) {
            terminarJuego();
        }
    });

    const mostrarGrafica = (() => {
        if(verGrafica) {

            setVerGrafica(false);
        } else {
            setVerGrafica(true);
            handleClickSiguiente();
        }
    });

    const handleClickSiguiente = (() => {
        if(numeroRespuesta !== -1) {
            let respuesta = preguntaActual.respuestas[numeroRespuesta];
            setContesta(contesta.concat(respuesta));
            if(respuesta.esCorrectoRespuesta === 1) setPuntuacion(puntuacion+preguntaActual.puntosPregunta);
            setNumeroRespuesta(-1);
        }
        setNumeroPregunta(numeroPregunta+1); //no se modifica hasta terminar la funcion
        if(info_juego.preguntas && (numeroPregunta < info_juego.preguntas.length)) {
            setPreguntaActual(info_juego.preguntas[numeroPregunta]);
            setCounter(info_juego.preguntas[numeroPregunta].segundosPregunta);
        } else {
            setPreguntaActual("");
        }
    });

    function render() {
        chequeo();
        let respuestas, respuestas2, ayuda;

        if(preguntaActual != null && preguntaActual !== "") {
            if(preguntaActual.respuestas && preguntaActual.respuestas.length > 1) {
                respuestas = <div className="PreguntaJuego">
                    <div><Button className="btn-regular" value={"A - "+preguntaActual.respuestas[0].contenidoRespuesta} onClick={() => handleClickRespuesta(0)}/></div>
                    <div><Button className="btn-regular" value={"B - "+preguntaActual.respuestas[1].contenidoRespuesta} onClick={() => handleClickRespuesta(1)}/></div>
                </div>;

                if(preguntaActual.tipoPregunta === "Quiz" && preguntaActual.respuestas.length === 4) {
                    respuestas2 = <div className="PreguntaJuego">
                        <div><Button className="btn-regular" value={"C - "+preguntaActual.respuestas[2].contenidoRespuesta} onClick={() => handleClickRespuesta(2)}/></div>
                        <div><Button className="btn-regular" value={"D - "+preguntaActual.respuestas[3].contenidoRespuesta} onClick={() => handleClickRespuesta(3)}/></div>
                    </div>;
                }
            }

            if(preguntaActual.urlAyudaPregunta.includes("http")) {
                //video
                ayuda = <embed id="ayuda-url" src={preguntaActual.urlAyudaPregunta} height={200}/>;
            } else {
                //imagen, tal vez con ese formato de url
                ayuda = <img id="ayuda-url" src={BASE_URL+"/game-images/"+preguntaActual.urlAyudaPregunta} height={200}/>;
            }
        }

        return (
            <div className="juegoMasterParent">
                <div className="TituloNumPreg">
                    <p>Pregunta <span id="numPreg">{numeroPregunta}</span></p>

                    {verGrafica ? (
                        <h4>{puntuacion}pts.</h4>
                    ) : (
                        <p>{preguntaActual.contenidoPregunta}</p>
                    )}
                </div>

                {verGrafica ? (
                    <h4>Aca deberia haber una grafica</h4>
                ) : (
                    <div className="AyudaJuego">
                        {ayuda}
                    </div>,
                    <div className="RespuestasJuego">
                        {respuestas}
                        {respuestas2}
                    </div>
                )}

                <div className="FooterJuego">
                    <div>{!verGrafica ? counter+"s" : ""}</div>

                    <div><Button className="btn-regular" onClick={() => mostrarGrafica()} value="Siguiente"/></div>
                </div>


            </div>
        )
    }

    return render();
}