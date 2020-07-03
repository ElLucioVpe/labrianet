import React, {useEffect, useState} from "react";
import Button from "./Button";
import QuizMasterServices from "../Libraries/QuizMasterServices";

export const ProfileUserStats = (props) => {

    function desactivarJuego(e) {
        props.desactivarJuego(e.target.firstChild.nodeValue, e.target.id);
    }

    return (
        <div class="profile-user-stats">
            <table class="profile-user-stats-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Pregunta</th>
                    <th>Jugados</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {props.juegos.map((game, i) =>
                    <tr key={i}>
                        <td>{game.tituloJuego}</td>
                        <td>{game.descripcionJuego}</td>
                        <td>{game.preguntas.length}</td>
                        <td>{props.jugados.length > 0 ? props.jugados[i].Jugados : ''}</td>
                        <td>{game.fechaJuego}</td>
                        <td><Button class="item" to={"/configurarJuego/" + game.idJuego} value="Editar"
                                    size="regular"/>
                            <Button id={i} class="item"
                                    value={game.activadoJuego === 1 ? "Desactivar" : "Activar"}
                                    size="regular" onClick={desactivarJuego}/>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default ProfileUserStats