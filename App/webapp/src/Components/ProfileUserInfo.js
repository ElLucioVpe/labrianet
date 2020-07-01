import React from "react";

export const ProfileUserInfo = (props) => {
    return (
        <div className="profile-user-info">
            <p><b>Creados: </b>{props.juegos.length != null ? props.juegos.length : "0"}</p>
            <p><b>Jugadores: </b>140</p>
        </div>
    )
}

export default ProfileUserInfo