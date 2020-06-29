import React, {useEffect, useState} from 'react'
import Button from "../Components/Button";
import '../Css/ResumenJuego.css'
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";
import QuizMasterService from '../Libraries/QuizMasterServices';

export default function ResumenJuego(props) {
    /*const data = [{"name": "test1"}, {"name": "test2"}];*/

    const [juegos, set_juegos] = useState([{}]);
    const [jugadores, set_jugadores] = useState([{}]);
    /* const [juegosBusqueda, set_JuegosBusqueda] = useState([{}]);*/
      
    /*const [busqueda, setbusqueda] = useState([{}]);*/
  
      useEffect(() => {
          async function doIt() {
              let data_juegos = await QuizMasterService.obtenerJuego({id:props.match.params.id});
              let data_jugadores = await QuizMasterService.obtenerJugadores({id:props.match.params.id});
              await set_jugadores(data_jugadores); 
              await set_juegos(data_juegos);             
              await console.log(await QuizMasterService.obtenerJuego({id:props.match.params.id}));
              await console.log(await QuizMasterService.obtenerJugadores({id:props.match.params.id}));
          }
          doIt()
      }, []);
     
    function render() {
        return (
            <div className="resumenJuego">
                <div className="resumenJuego_Info">
                    <div id="COVER GAME">
                        <img src={"/" + juegos.coverJuego}  alt="Mi titulo de la imagen"/>
                    </div>
                     {
                     <div>
                     <div id="GAME STATS">    

                        <div className="tituloJuego">{juegos.tituloJuego}</div>
                        <div>{jugadores.JugadoresSinTerminar} | Jugados</div>
                        <div>{jugadores.Jugadores} | Jugadores</div>
                      </div>
                       <div id="GAME PRIV">
                       <div>
                           <span>{juegos.esPrivadoJuego == 1 ? <div>Privado</div>: <div>Publico</div>}</span>
                       </div>
                   </div>
                   </div>
                     }       
                    <div id="GAME PLAY">
                        <Button class="item" to="/jugar" value="Jugar" size="large"/>
                    </div>

                </div>
                <div className="resumenJuego_Preguntas">
                  
                    <div>
                        Preguntas({juegos.preguntas == null ? <div></div> :Object.keys(juegos.preguntas)})
                    </div>
                    <div className="preguntas">
                        
                        { juegos.preguntas == null ? <div>undefinifo</div> :
                        juegos.preguntas.map((pregunta) => {
                                    return Pregunta(pregunta) 
                                }) }  
                            
                        
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
    function Juego( juego ) {
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
      function Pregunta( pregunta ) {   
          return (
            
              <div className="pregunta-container">
                <div>1 - {pregunta.tipoPregunta}</div>
               Segundos: {pregunta.segundosPregunta}
               Tipo: { pregunta.tipoPregunta}
            </div> 
      );
      }
    return render();
}