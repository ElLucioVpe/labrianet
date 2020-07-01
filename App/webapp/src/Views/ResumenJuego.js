import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import QuizMasterService from "../Libraries/QuizMasterServices";

import "../Css/ResumenJuego.css";
const BASE_URL = "http://localhost:44353";
export default function ResumenJuego(props) {
  /*const data = [{"name": "test1"}, {"name": "test2"}];*/

  const [juegos, set_juegos] = useState([{}]);
  const [jugadores, set_jugadores] = useState([{}]);
  /* const [juegosBusqueda, set_JuegosBusqueda] = useState([{}]);*/

  /*const [busqueda, setbusqueda] = useState([{}]);*/
  useEffect(() => {
    async function doIt() {
      let data_juegos = await QuizMasterService.obtenerJuego({
        id: props.match.params.id,
      });
      let data_jugadores = await QuizMasterService.obtenerJugadores({
        id: props.match.params.id,
      });
      await set_jugadores(data_jugadores);
      await set_juegos(data_juegos);
      await console.log(
        await QuizMasterService.obtenerJuego({ id: props.match.params.id })
      );
      await console.log(
        await QuizMasterService.obtenerJugadores({ id: props.match.params.id })
      );
    }
    doIt();
  }, []);

  function render() {
    return (
      <div className="resumenJuego">
        <div className="resumenJuego_Info">
          <div className="COVER-GAME">
    {/*<img src={"/" + juegos.coverJuego} alt="Mi titulo de la imagen" />*/}
            <img src="img/perfil.png" alt="Mi titulo de la imagen" height="100%" width="100%" />
          </div>
          {
            <div>
              <div id="GAME STATS">
                <div className="tituloJuego"><h4>{juegos.tituloJuego}</h4></div>
                <div>{jugadores.JugadoresSinTerminar} | Jugados</div>
                <div>{jugadores.Jugadores} | Jugadores</div>
              </div>
              <div id="GAME PRIV">
                <div>
                  <span>
                    {juegos.esPrivadoJuego == 1 ? (
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
          src={BASE_URL + "/game-images/" + pregunta.urlAyudaPregunta}
          height="50px" width="50px"
        />
      );
    }
    return (
     
      <div className="pregunta-container">
        <div className="pregunta_izquierda">
        <div>1 - {pregunta.tipoPregunta}</div>
        <div className="pregunta-TituloPregunta"><h2>Pregunta {i}</h2></div>
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
