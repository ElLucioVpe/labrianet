import React from 'react'
import Button from "../Components/Button";

class CrearPreguntas extends React.Component {
    render() {
        return (
            <div class="crearPreguntas">
                <div class="tablero">
                    <div>
                        <p>Tablero preguntas</p>
                    </div>
                </div>
                <div class="pregunta">
                    <div class="flex justify-content-center">
                        <input placeholder="Pregunta" class="regular w-80"/>
                    </div>
                    <div class="flex justify-content-center mt-10">
                        <div class="flex flex-direction-column justify-content-center w-20">
                            <input placeholder="20s" class="regular"/>
                            <input placeholder="1000 pts" class="regular"/>
                        </div>
                        <div class="flex w-80 justify-content-center">
                            <img src="img/perfil.png"/>
                        </div>
                    </div>
                    <div class="grid-2-2 mt-20">
                        <Button classList="item justify-self-end" to="/login" value="Respuesta" size="regular"/>
                        <Button classList="item justify-self-start" to="/login" value="Respuesta" size="regular"/>
                        <Button classList="item justify-self-end" to="/login" value="Respuesta" size="regular"/>
                        <Button classList="item justify-self-start" to="/login" value="Respuesta" size="regular"/>
                    </div>
                    <div class="flex justify-content-end">
                        <Button class="item" to="/login" value="Fin" size="regular"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CrearPreguntas