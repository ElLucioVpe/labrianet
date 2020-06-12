import React from 'react'
import Button from "../Components/Button";
import Input from '../Components/Input'

class Jugar extends React.Component {
    render() {
        return (
            <div className="Jugar container">
                <div className="join">
                    <Input placeholder="Titulo" size="big"/>
                </div>
                <div className="password">
                    <Input placeholder="Titulo" size="big"/>
                </div>
                <div className="filtro">
                    <Input placeholder="Titulo" size="big"/>
                </div>
                <div className="juegos">
                    <Input placeholder="Titulo" size="big"/>
                </div>
                <div className="iniciar">
                    <Button class="item" to="/login" value="Configurar" size="regular"/>
                </div>
            </div>
        )
    }
}

export default Jugar