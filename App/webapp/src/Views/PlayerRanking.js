import React, {useEffect, useState} from "react";
import GameName from "../Components/GameName.js";
import UserName from "../Components/UserName.js";
import GameRanking from "../Components/GameRanking.js";
import "../Css/PlayerRanking.css";
import Button from "../Components/Button";
import QuizMasterService from '../Libraries/QuizMasterServices';


export default function PlayerRanking(props) {
    const [rankings, set_rankings] = useState([{}]);
    const [partida, set_partida] = useState({nickUsuario: "Anonimo", puntaje: 0});
    const [nombreJuego, set_nombreJuego] = useState("Game");
    
  /*const [busqueda, setbusqueda] = useState([{}]);*/

    useEffect(() => {
        async function doIt() {
            let data_rankings = await QuizMasterService.obtenerRanking({id:props.match.params.id});
            //await console.log(await QuizMasterService.obtenerRanking({id:props.match.params.id}));
            await set_rankings(data_rankings);
            set_partida({nickUsuario: props.match.params.nick, puntaje: props.match.params.puntos});
        }
        async function cargarNombreJuego() {
            let data_juego = await QuizMasterService.obtenerJuego(props.match.params.id);
            await set_nombreJuego(data_juego.tituloJuego);
        }
        cargarNombreJuego()
        doIt()
    }, []);

    function render() {
        return (
            <div class="Ranking">
                <div class="containerRanking">
                    <div class="tituloJuego">
                        <grid-center>
                            <h>{nombreJuego}</h>
                        </grid-center>
                    </div>
                    <div class="userPuntaje">
                        <div class="contenedor">
                            <div class="flex-item">
                                <h>{partida.nickUsuario}</h>
                            </div>
                            <div class="flex-item derecha">{partida.puntaje} pts</div>
                        </div>
                    </div>
                    <div class="puntajeGeneral">
                        <div class="scroll">
                            <table cellpadding="0">
                                
                                {rankings.map((ranking, index) => {
                                    return <Ranking ranking={ranking}/>;
                                }) }                            
                            </table>
                        </div>
                    </div>
                    <div class="botoncito">
                        <div class="flex-Button">
                            {" "}
                            <Button class="item" to="/index" value="Fin"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    function Ranking({ ranking }) {
        return (
          <tr className="Ranking">
            <td className="all">{ranking.nickUsuario}</td>
            <td className="all">{ranking.Puntaje}pts</td>

          </tr>
        );
      }
      
    return render();
}