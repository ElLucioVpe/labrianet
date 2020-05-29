import React from 'react'
import {
    Link
} from "react-router-dom";
import '../App.css';

class ComienzoJuego extends React.Component {
    render() {
        return (
            <div class="ComienzoJuego">
                <img class="imagen" src="logo.svg"/><h1>QuizMaster</h1>
                <input className="joingame" type="text" name="linkgame" placeholder="Unirse a partida (link)"/>

                <input className="passwordgame" type="text" name="passgame" placeholder="Contraseña"/>

                <input className="filtrogame" type="text" name="filtergame" placeholder="Filtro"/>

                <div className="scrollhorizontal">
                    <div className="gamecontainer">
                       <p><img  alt="cover1"/></p>
                        <p>Juego1</p>
                    </div>
                    <div className="gamecontainer">
                        <p><img  alt="cover2"/></p>
                        <p>Juego2</p>
                    </div>
                    <div className="gamecontainer">
                        <p><img  alt="cover3"/></p>
                        <p>Juego3</p>
                    </div>
                    <div className="gamecontainer">
                        <p><img  alt="cover4"/></p>
                        <p>Juego4</p>
                    </div>
                    <div className="gamecontainer">
                        <p><img  alt="cover5"/></p>
                        <p>Juego5</p>
                    </div>
                </div>
                <Link class="item" to="/jugar"><button class="aceptar">Jugar</button></Link>
            </div>

        )
    }
}

export default ComienzoJuego;