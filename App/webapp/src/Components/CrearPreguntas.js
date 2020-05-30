import React from 'react'
import Button from "../Components/Button";
import Input from '../Components/Input';
import CrearJuegoPreguntas from "../Views/CrearJuegoPreguntas";
import '../Css/CrearJuegoPreguntas.css'

import ScrollArea from 'react-scrollbar'

class CrearPreguntas extends React.Component {
    render() {
        return (
            <div class="crearPreguntas">
                <div class="tablero card">
                    <div>
                        <h2>Tablero</h2>
                    </div>
                    <div>
                        <ScrollArea horizontal={false}>
                            <CrearJuegoPreguntas/>
                            <CrearJuegoPreguntas/>
                            <CrearJuegoPreguntas/>
                            <CrearJuegoPreguntas/>
                            <CrearJuegoPreguntas/>
                            <CrearJuegoPreguntas/>
                            <CrearJuegoPreguntas/>
                        </ScrollArea>
                    </div>
                    <div>
                        <Button class=" item" to="/" value="Nueva" size="regular"/>
                    </div>
                </div>
                <div class="pregunta card">
                    <div class="flex justify-content-center">
                        <Input placeholder="Pregunta" classList="w-80" size="regular"/>
                    </div>
                    <div class="flex justify-content-center mt-10">
                        <div class="flex flex-direction-column justify-content-center w-20">
                            <Input placeholder="20s" size="regular"/>
                            <Input placeholder="1000 pts" size="regular" classList="mt-10"/>
                        </div>
                        <div class="flex w-80 justify-content-center">
                            <img class="pregunta_foto" src="img/perfil.png"/>
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