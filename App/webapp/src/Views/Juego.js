import React, {useEffect, useState} from 'react'
import Button from '../Components/Button'
import '../Css/Juego.css'

export default function Juego() {
    const [info_juego, setInfo_juego] = useState([]);

    useEffect(() => {
        /*

        let id_juego = this.props.match.params.idJuego;

        const response = await fetch("http://localhost:44353/api/Juego/GetJuego/"+id_juego);
        const data = await response.json();
        this.setState({info_juego: data});

         */
    }, []);

    function render() {
        return (
            <div class="juegoMasterParent">

                <div className="TituloNumPreg">
                    <p>Pregunta <span id="numPreg">(x)</span></p>
                </div>

                <div className="AyudaJuego">
                    <div>AYUDA</div>
                    <div>REPRODUCTOR IMAGINALO DALE</div>
                </div>


                <div className="PreguntaJuego">
                    <div><input className="input" type="submit" className="btn-regular" value="Resp1"/></div>
                    <div><input className="input" type="submit" className="btn-regular" value="Resp2"/></div>
                </div>

                <div className="PreguntaJuego">
                    <div><input className="input" type="submit" className="btn-regular" value="Resp3"/></div>
                    <div><input className="input" type="submit" className="btn-regular" value="Resp4"/></div>
                </div>


                <div className="FooterJuego">
                    <div>xS</div>
                    <div><input className="input" type="submit" className="btn-regular" value="Siguiente"/></div>
                </div>


            </div>
        )
    }

    return render();
}