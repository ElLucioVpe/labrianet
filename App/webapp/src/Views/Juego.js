import React, { useEffect, useState } from "react";
import "../Css/Juego.css";
import QuizMasterService from "../Libraries/QuizMasterServices";
import { useUsuario } from "../Libraries/UserContextLib";
import Button from "../Components/Button";
import Grafica from "../Components/Grafica.js";
import YouTube from "react-youtube";
const BASE_URL = "http://localhost:44353";

export default function Juego(props) {
  const usuario = useUsuario();
  const [nickname, setNickname] = useState("Anonimo");
  const [info_juego, setInfo_juego] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [numeroPregunta, setNumeroPregunta] = useState(1);
  const [numeroRespuesta, setNumeroRespuesta] = useState(-1);
  const [preguntaActual, setPreguntaActual] = useState("");
  const [datosGrafica, setDatosGrafica] = useState({idPregunta: 0, idRespuesta: 0});
  const [contesta, setContesta] = useState([]);
  const [counter, setCounter] = useState(-1);
  const [counterPausa, setCounterPausa] = useState(0);
  const [verGrafica, setVerGrafica] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [pasar, setPasar] = useState(false);

  useEffect(() => {
    async function cargarJuego() {
      await QuizMasterService.obtenerJuego({id: props.match.params.id})
        .then(function (data) {
          //console.log(data);
          setInfo_juego(data);
          setPreguntaActual(data.preguntas[0]);
          setCounter(parseInt(data.preguntas[0].segundosPregunta));
          if (props.match.params.nick) setNickname(props.match.params.nick);
          else
            window.location = "/prejuego/:id".replace(
              ":id",
              props.match.params.id
            );
        })
        .catch(function (error) {
          //window.location = "/";
        });
    }
    cargarJuego();
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        if (!verGrafica) {
          if (counterPausa !== 0) {
            setCounterPausa(0);
            setCounter(counterPausa);
          } else setCounter(counter - 1);
        } else {
          if (counterPausa === 0) setCounterPausa(counter);
          setCounter(counter + 1);
        }
      }, 1000);
    if (counter === 0 && !verGrafica) mostrarGrafica(); //Se le acaba el tiempo
    return () => clearInterval(timer);
  }, [counter]);

  const handleClickRespuesta = (nroRespuesta) => {
    if(!pasar){
      setNumeroRespuesta(nroRespuesta);
      setPasar(true);
      setCounter(3);
    }
  };

  const terminarJuego = async () => {
    var dataPartida = {
      Juego_idJuego: info_juego.idJuego,
      nickUsuario: nickname,
    };
    if (usuario.inicioSesion)
      dataPartida["User_loginnameUser"] = usuario.usuario;

    var idPartida = await QuizMasterService.crearPartida(dataPartida);
    //Creo la relacion con las preguntas
    let respuestasRespondidas;
    contesta.forEach(
      (respuestasRespondidas = async function (item, i) {
        let exito = await QuizMasterService.respuestaRespondida(
          item.idRespuesta,
          idPartida
        );
        console.log(exito);
      })
    );
    setJuegoTerminado(true); //para evitar se ejecute multiples veces
    window.location =
      "/playerRanking/" +
      info_juego.idJuego +
      "&" +
      nickname +
      "&" +
      puntuacion;
  };

  const chequeo = () => {
    if (
      info_juego.preguntas &&
      numeroPregunta > info_juego.preguntas.length &&
      !juegoTerminado &&
      !verGrafica
    ) {
      terminarJuego();
    }
  };

  const mostrarGrafica = () => {
    if (verGrafica) {
      setVerGrafica(false);
    } else {
      let idRespuesta = -1;
      if(numeroRespuesta !== -1 && preguntaActual !== "") idRespuesta = preguntaActual.respuestas[numeroRespuesta].idRespuesta;
      setDatosGrafica({idPregunta: preguntaActual.idPregunta, idRespuesta: idRespuesta});
      console.log("A ver ---"+pasar);
      if(pasar) {
        setPasar(false);
        setVerGrafica(true);
        handleClickSiguiente();
      } else {
        setPasar(true);
        setCounter(3);
      }
    }
  };

  const handleClickSiguiente = () => {
    if(pasar) {
      if (numeroRespuesta !== -1) {
        let respuesta = preguntaActual.respuestas[numeroRespuesta];
        setContesta(contesta.concat(respuesta));
        if (respuesta.esCorrectoRespuesta === 1)
          setPuntuacion(puntuacion + preguntaActual.puntosPregunta);
        setNumeroRespuesta(-1);
      }
      setNumeroPregunta(numeroPregunta + 1); //no se modifica hasta terminar la funcion
      if (info_juego.preguntas && numeroPregunta < info_juego.preguntas.length) {
        setPreguntaActual(info_juego.preguntas[numeroPregunta]);
        setCounter(info_juego.preguntas[numeroPregunta].segundosPregunta);
      } else {
        setPreguntaActual("");
      }
    }
  };

  const youtube_parser = (url) => {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : false;
  };

  function render() {
    chequeo();

    let respuestas, respuestas2, ayuda;

    if (preguntaActual != null && preguntaActual !== "") {
      if (preguntaActual.respuestas && preguntaActual.respuestas.length > 1) {
        respuestas = (
          <div className="PreguntaJuego">
            <div>
              <button
                className="resp-btn boton-A"
                onClick={() => handleClickRespuesta(0)}
              >
                {"A - " + preguntaActual.respuestas[0].contenidoRespuesta}
              </button>
            </div>
            <div>
              <button
                className="resp-btn boton-B"
                onClick={() => handleClickRespuesta(1)}
              >
                {"B - " + preguntaActual.respuestas[1].contenidoRespuesta}
              </button>
            </div>
          </div>
        );

        if (
          preguntaActual.tipoPregunta === "Quiz" &&
          preguntaActual.respuestas.length === 4
        ) {
          respuestas2 = (
            <div className="PreguntaJuego">
              <div>
                <button
                  className="resp-btn boton-C"
                  onClick={() => handleClickRespuesta(2)}
                >
                  {"C - " + preguntaActual.respuestas[2].contenidoRespuesta}
                </button>
              </div>
              <div>
                <button
                  className="resp-btn boton-D"
                  onClick={() => handleClickRespuesta(3)}
                >
                  {"D - " + preguntaActual.respuestas[3].contenidoRespuesta}
                </button>
              </div>
            </div>
          );
        }
      }

      if (preguntaActual.urlAyudaPregunta.includes("http")) {
        //video
        var url = preguntaActual.urlAyudaPregunta;
        var video_id = youtube_parser(url);
        //console.log("V id: "+video_id);

        var opts = {
          height: 300,
          width: 550,
          playerVars: {
            start: preguntaActual.startAyuda,
            end: preguntaActual.endAyuda,
            autoplay: 1,
          },
        };
        ayuda = (
          <YouTube
            videoId={video_id}
            id="ayuda-url"
            containerClassName={"youtubeContainer"}
            opts={opts}
          />
        );
      } else {
        //imagen, tal vez con ese formato de url
        ayuda = (
          <img
            id="ayuda-url"
            src={BASE_URL + "/game-images/" + preguntaActual.urlAyudaPregunta}
            height={200}
          />
        );
      }
    }

    return (
      <div className="juegoMasterParent container">
        <div className="TituloNumPreg">
          <p>
            Pregunta
            <span id="numPreg">{verGrafica? numeroPregunta-1 : numeroPregunta}</span>
          </p>

          {verGrafica ? (
            <h4>{puntuacion}pts.</h4>
          ) : (
            <p>{preguntaActual.contenidoPregunta}</p>
          )}
        </div>

        {verGrafica ? (
         <Grafica idPregunta={datosGrafica.idPregunta} idRespuesta={datosGrafica.idRespuesta}/>
        ) : (
          <div>
            <div className="AyudaJuego">{ayuda}</div>
            <div className="RespuestasJuego">
              {respuestas}
              {respuestas2}
            </div>
          </div>
        )}

        <div className="FooterJuego">
          <div>
            {!verGrafica ? (
              <Button className="btn-regular" value={counter + "s"} />
            ) : (
              ""
            )}
          </div>

          <div>
            <Button
              className="btn-regular"
              onClick={() => mostrarGrafica()}
              value="Siguiente"
            />
          </div>
        </div>
      </div>
    );
  }

  return render();
}
