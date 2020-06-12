import React from 'react'
import CrearPreguntas from "../Components/CrearPreguntas";
import Button from "../Components/Button";
import Input from '../Components/Input'
import '../Css/CrearJuego.css'

class CrearJuego extends React.Component {
    render() {
        return (
            <div class="container" style={{height: '100%'}}>
                <div class="titleHeader">
                    <Input placeholder="Titulo" size="big"/>
                    <Button class="item" to="/login" value="Configurar" size="regular"/>
                </div>
                <CrearPreguntas/>
            </div>
        )
    }
}

export default CrearJuego