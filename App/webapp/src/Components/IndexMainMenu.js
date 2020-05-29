import React from 'react'
import {Link} from "react-router-dom";

export const IndexMainMenu = () => {
    return (
        <div className="self-center">
            <div id="index">
                <img className="item" src="logo.svg"/><h1>QuizMaster</h1>
                <Link class="item" to="/jugar">
                    <button>Jugar</button>
                </Link>
                <Link class="item" to="/crear">
                    <button>Crear juego</button>
                </Link>
            </div>
        </div>
    )
}