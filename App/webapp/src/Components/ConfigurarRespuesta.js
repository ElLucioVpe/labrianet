import React, {useEffect, useState} from 'react'
import Button from "./Button";
import DarkThemeSwitcher from "./DarkThemeSwitcher";
import {Link} from "react-router-dom";
import {useUsuario} from "../Libraries/UserContextLib";
import '../Css/Header.css'

class ConfigurarRespuesta extends React.Component {
    render() {
        return (
            <div className="modal configurarRespuesta">
                aca va un modal para cambiar la respuesta xd
            </div>
        )
    }
}

export default ConfigurarRespuesta