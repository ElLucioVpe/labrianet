import React from 'react'
import {
    Link
} from "react-router-dom";
import "../Css/Enlace.css";

export default function Enlace() {
    function render() {
        return (
            <div class="menu2">
                <img class="imagen" src="logo.svg"/><h1>QuizMaster</h1>
                <h1>Unirse:</h1>
                <div className="LinkInput">
                    LINK GOES HERE
                </div>
                <Link class="item" to="/jugar">
                    <button>Cerrar</button>
                </Link>
            </div>
        )
    }

    return render();
}
