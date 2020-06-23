import React from 'react'
import Button from "../Components/Button";
import Input from '../Components/Input'
import QuizPreview from '../Components/QuizPreview'

import "../Css/Jugar.css"
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";

class Jugar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            juegos: [],
        };
    }

    async crearJuego() {
        this.setState({
            juegos: this.state.juegos.concat({
                titulo: null,
                imgUrl: null,
            })
        })
    }

    render() {
        return (
            <div className="Jugar container">
                <div className="join card flex flex-direction-row align-items-center">
                    <p>Si tienes un código para unirte a un juego, escríbelo aqui:</p>
                    <div className="relative ml-10">
                        <img className="invite-key" src="/views/jugar/key.webp" alt/>
                        <Input classList="invite-input" placeholder="QM-XXX-XXX" size="big"/>
                    </div>
                </div>
                <div className="card mt-10">
                    <div className="filtro relative">
                        <img className="filter-search" src="/views/jugar/search.png" alt/>
                        <Input classList="filter-input" placeholder="Filtro" size="big"/>
                    </div>
                    <div
                        className="listado overflow-overlay bg-white border-radius-25px flex flex-direction-row mt-10">
                        {this.state.juegos.map((juego, i) => <QuizPreview
                            key={i} id={i} {...juego}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Jugar