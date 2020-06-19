import React from 'react'
import Button from "../Components/Button";

class CrearJuegoPreguntas extends React.Component {
    render() {
        return (
            <div class="crearJuegoPreguntas flex flex-direction-column" onClick={this.props.onClick}>
                <div class="text-align-center">
                    <p>{this.props.titulo || ''}</p>
                </div>
                <div class="text-align-center">
                    <img src={this.props.imgUrl || 'img/perfil.png'} class="PreguntaPreview"/>
                </div>
                <div class="flex flex-direction-row justify-content-space-between">
                    <p>{this.props.puntaje === null ? '0p' : this.props.puntaje + "p"}</p>
                    <p>{this.props.segundos === null ? "0s" : this.props.segundos + "s"}</p>
                </div>
            </div>
        )
    }
}

export default CrearJuegoPreguntas