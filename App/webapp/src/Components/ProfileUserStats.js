import React from "react";
import Button from "./Button";

export const ProfileUserStats = () => {
    return (
        <div class="profile-user-stats">
            <table>
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
                <tr>
                    <td>FutbolQuiz</td>
                    <td>Cuanto se de fútbol</td>
                    <td>15</td>
                    <td>85</td>
                    <td>01/01/2020</td>
                    <td><Button class="item" to="/login" value="Editar" size="regular"/><Button class="item" to="/login" value="Desactivar" size="regular"/></td>
                </tr>
                <tr>
                    <td>PoliticsQuiz</td>
                    <td>Como estoy con la politica</td>
                    <td>10</td>
                    <td>40</td>
                    <td>01/01/2020</td>
                    <td><Button class="item" to="/login" value="Editar" size="regular"/><Button class="item" to="/login" value="Activar" size="regular"/></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProfileUserStats