import React, {useEffect, useState} from 'react'
import Button from "../Components/Button";
import '../Css/ResumenJuego.css'
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";
import QuizMasterService from '../Libraries/QuizMasterServices';

export default function ResumenJuego(props) {
    /*const data = [{"name": "test1"}, {"name": "test2"}];*/

    const [juegos, set_juegos] = useState([{}]);
    /* const [juegosBusqueda, set_JuegosBusqueda] = useState([{}]);*/
      
    /*const [busqueda, setbusqueda] = useState([{}]);*/
  
      useEffect(() => {
          async function doIt() {
              let data_juegos = await QuizMasterService.obtenerJuego({id:props.match.params.id});
              await console.log(await QuizMasterService.obtenerJuego({id:props.match.params.id}));
              
              await set_juegos(data_juegos);
              
          }
          doIt()
      }, []);
     
    function render() {
        return (
            <div className="resumenJuego">
                <div className="resumenJuego_Info">
                    <div id="COVER GAME">
                        <img alt="Mi titulo de la imagen"/>
                    </div>
                     {juegos.map((juego, index) => {
                                    return <Juego juego={juego}/>;
                                })}       
                    <div id="GAME PLAY">
                        <Button class="item" to="/jugar" value="Jugar" size="large"/>
                    </div>

                </div>
                <div className="resumenJuego_Preguntas">
                  
                    <div>
                        Preguntas(x)
                    </div>
                    <div className="listaPreguntas">
                        <ul>
                        {juegos.preguntas.map((pregunta, index) => {
                                    return <Pregunta pregunta={pregunta}/>;
                                })}  
                            {/*data.map((d) => <li key={d.name}>{d.name}</li>)*/}
                        </ul>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
    function Juego({ juego }) {
        return (
         <div>
         <div id="GAME STATS">
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
      function Pregunta({ pregunta }) {   
          return (
            <div>
               Puntos: {pregunta.puntosPregunta}
               Segundos: {pregunta.segundosPregunta}
               Tipo: { pregunta.tipoPregunta}

            </div>

      );
      }
    return render();
}