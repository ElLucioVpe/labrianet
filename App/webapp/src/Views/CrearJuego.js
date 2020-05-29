import React from 'react'
import CrearPreguntas from "../Components/CrearPreguntas";
import Button from "../Components/Button";

class CrearJuego extends React.Component {
    render() {
        return (
            <div class="container" style={{height: '100%'}}>
                <div class="titleHeader">
                    <input type="text" placeholder="Titulo" class="big"/>
                    <Button class="item" to="/login" value="Configurar" size="regular"/>
                </div>
                <CrearPreguntas/>
            </div>
        )
    }
}

export default CrearJuego