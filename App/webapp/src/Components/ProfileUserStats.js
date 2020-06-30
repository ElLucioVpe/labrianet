import React from "react";
import Button from "./Button";

export const ProfileUserStats = (props) => {
    const desactivarJuego = ((id) => {
        props.desactivarJuego(id);
    });

    return (
        <div class="profile-user-stats">
            <table class="profile-user-stats-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Pregunta</th>
                    <th>Jugadores</th>
                    <th>Creado</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {props.juegos.map((pregunta, i) => <tr key={i}>
                    <td>{pregunta.tituloJuego}</td>
                    <td>{pregunta.descripcion}</td>
                    <td>What</td>
                    <td>{pregunta.tituloJuego}</td>
                    <td>{pregunta.tituloJuego}</td>
                    <td><Button class="item" to={"/crear/" + (pregunta.idJuego || "")} value="Editar"
                                size="regular"/>
                        <Button class="item"
                                value={pregunta.activadoJuego === 1 ? "Desactivar" : "Activar"}
                                size="regular" onClick={desactivarJuego}/>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default ProfileUserStats