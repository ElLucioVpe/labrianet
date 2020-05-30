import React from 'react'
import Button from "../Components/Button";

class CrearJuegoPreguntas extends React.Component {
    render() {
        return (
            <div class="crearJuegoPreguntas flex flex-direction-column">
                <div class="text-align-center">
                    <p>Pregunta 1</p>
                </div>
                <div class="text-align-center">
                    <img src="img/perfil.png" class="PreguntaPreview"/>
                </div>
                <div class="flex flex-direction-row justify-content-space-between">
                    <p>20s</p>
                    <p>Quiz</p>
                </div>
            </div>
        )
    }
}

export default CrearJuegoPreguntas