import React from 'react'
import Button from "../Components/Button";
import '../Css/ResumenJuego.css'
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";

export default function ResumenJuego() {
    const data = [{"name": "test1"}, {"name": "test2"}];

    function render() {
        return (
            <div className="resumenJuego">
                <div className="resumenJuego_Info">
                    <div id="COVER GAME">
                        <img alt="Mi titulo de la imagen"/>
                    </div>

                    <div id="GAME STATS">
                        <div>GAME NAME</div>
                        <div>GAME DESCRIPTION <br/></div>
                        <div>xx? jugados <br/></div>
                        <div>xx? jugadores <br/></div>
                    </div>

                    <div id="GAME PRIV">
                        <div>Privacidad</div>
                        <div>
                            <span>Privado</span>
                            <span>/</span>
                            <span>Publico</span>
                        </div>
                    </div>

                    <div id="GAME PLAY">
                        <Button class="item" to="/jugar" value="Jugar" size="large"/>
                    </div>

                </div>
                <div className="resumenJuego_Preguntas">
                    <div>
                        Preguntas(x)
                    </div>
                    <div className="listaPreguntas">
                        <ul>
                            {data.map((d) => <li key={d.name}>{d.name}</li>)}
                        </ul>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }

    return render();
}