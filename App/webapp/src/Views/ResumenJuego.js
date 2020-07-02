import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import QuizMasterService from "../Libraries/QuizMasterServices";

import "../Css/ResumenJuego.css";
import Enlace from "./Enlace";
//const BASE_URL = "http://localhost:44353";
export default function ResumenJuego(props) {

  const [juegos, set_juegos] = useState([{}]);
  const [jugadores, set_jugadores] = useState([{}]);
  const [irAenlace, set_irAenlace] = useState(false);

  useEffect(() => {
    async function doIt() {
      if(props.match.params.id === false || props.match.params.id === -1) set_irAenlace(true); //Lo manda a mostrarle el error en enlace

      let data_juegos = await QuizMasterService.obtenerJuego({
        id: props.match.params.id,
      });
      let data_jugadores = await QuizMasterService.obtenerJugadoresJuego({
        id: props.match.params.id,
      });
      await set_jugadores(data_jugadores);
      await set_juegos(data_juegos);

    }
    doIt();
  }, []);

  function onClickJugar() {
    set_irAenlace(true);
  }

  function render() {
    return (
        irAenlace ? <Enlace id={juegos.idJuego}/> :
      <div className="resumenJuego">
        <div className="resumenJuego_Info">
          <div className="COVER-GAME">
          <img src={juegos.coverJuego ? QuizMasterService.getUrlImagen("cover",juegos.coverJuego) : "img/perfil.png"} alt="Mi titulo de la imagen" />
          </div>
          {
            <div>
              <div id="GAME STATS">
                <div className="tituloJuego"><h4>{juegos.tituloJuego}</h4></div>
                <div>{jugadores.Jugados} | Jugados</div>
                <div>{jugadores.Jugadores} | Jugadores</div>
              </div>
              <div id="GAME PRIV">
                <div>
                  <span>
                    {juegos.esPrivadoJuego === 1 ? (
                      <div>Privado</div>
                    ) : (
                      <div>Publico</div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          }
          <div id="GAME PLAY">
            <Button class="item" to="/jugar" value="Jugar" size="large" />
          </div>
        </div>
        <div className="resumenJuego_Preguntas">
          <div className="resumenJuego_PreguntasGrid">
          <div className = "PreguntasHeader">
            Preguntas(
            {juegos.preguntas == null ? (
              <div></div>
            ) : (
              Object.keys(juegos.preguntas).length
            )}
            )
          </div>
          <div className="preguntas">
            {juegos.preguntas == null ? (
              <div>undefinifo</div>
            ) : (
            
              juegos.preguntas.map((pregunta, i) => {
                
                return Pregunta(pregunta, i);
              })
            )}
          </div>
          <div></div>
          </div>
        </div>
      </div>
    );
  }
  function Juego(juego) {
    return (
      <div>
        <div id="GAME STATS" className="container">
          <div>{juego.tituloJuego}</div>
          <div>{juego.descripcionJuego}</div>
        </div>
        <div id="GAME PRIV">
          <div>Privacidad</div>
          <div>
            <span>{juego.esPrivadoJuego}</span>
          </div>
        </div>
      </div>
    );
  }
  function Pregunta(pregunta, i) {
    i = i +1;
    let ayuda;
    if (pregunta.urlAyudaPregunta.includes("http")) {
      var url = pregunta.urlAyudaPregunta;
      var video_id = youtube_parser(url);
      //console.log("V id: "+video_id);

    
      ayuda = (
        <img  id="ayuda-url" 
        src={"https://img.youtube.com/vi/" +video_id+"/default.jpg"}
        />
      );
    } else {
      //imagen, tal vez con ese formato de url
      ayuda = (
        <img
          id="ayuda-url"
          src={pregunta.urlAyudaPregunta ? QuizMasterService.getUrlImagen("ayuda", pregunta.urlAyudaPregunta) : 'img/perfil.png'}
          height="90px" width="120px"
        />
      );
    }
    return (
     
      <div className="pregunta-container">
        <div className="pregunta_izquierda">
        <div>1 - {pregunta.tipoPregunta}</div>
        <div className="pregunta-TituloPregunta"><h2>{pregunta.contenidoPregunta}</h2></div>
        </div>
        <div className="pregunta_derecha">
        <div>{ayuda}</div>
        <div>{pregunta.segundosPregunta} seg</div>
        
        </div>
      </div>
     
    );
  }
  const youtube_parser = (url) => {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : false;
  };

  return render();
}
