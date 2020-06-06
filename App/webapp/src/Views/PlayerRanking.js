import React from "react";
import GameName from "../Components/GameName.js";
import UserName from "../Components/UserName.js";
import GameRanking from "../Components/GameRanking.js";
import "../Css/PlayerRanking.css";
import Button from "../Components/Button";

class PlayerRanking extends React.Component {
    render() {
        return (
            <div class="Ranking">
                <div class="containerRanking">
                    <div class="tituloJuego">
                        <grid-center>
                            <GameName/>
                        </grid-center>
                    </div>
                    <div class="userPuntaje">
                        <div class="contenedor">
                            <div class="flex-item">
                                <UserName/>
                            </div>
                            <div class="flex-item derecha">500 pts</div>
                        </div>
                    </div>
                    <div class="puntajeGeneral">
                        <div class="scroll">
                            <table cellpadding="0">
                                <tr>
                                    <td class="all">Leandro Borges</td>
                                    <td class="all">700.000pts</td>
                                </tr>
                                <tr>
                                    <td>Maestro</td>
                                    <td>30.000pts</td>
                                </tr>
                                <tr>
                                    <td>Martín Soca</td>
                                    <td>900pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>500pts</td>
                                </tr>
                                <tr>
                                    <td>José Ramirez</td>
                                    <td>40pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>37pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>30pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
                                <tr>
                                    <td>José Gonzáles</td>
                                    <td>12pts</td>
                                </tr>
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
}

export default PlayerRanking;
