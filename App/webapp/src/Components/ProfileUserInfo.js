import React from "react";
import QuizMasterServices from "../Libraries/QuizMasterServices";

export const ProfileUserInfo = (props) => {
    return (
        <div className="profile-user-info">
            <p><b>Creados: </b>{props.juegos.length != null ? props.juegos.length : "0"}</p>
            <p><b>Jugadores: </b>{props.stats.Jugadores != null ? props.stats.Jugadores : '0'}</p>
        </div>
    )
}

export default ProfileUserInfo