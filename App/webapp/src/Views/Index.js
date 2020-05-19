import React from 'react'
import {
    Link
} from "react-router-dom";
import '../App.css';

class Index extends React.Component {
    render() {
        return (
            <div class="index">
                <div className="main_introduction">
                    <p>Crea tus propias trivias y compartela con tus amigos de la forma más fácil y divertida!</p>
                </div>
                <div class="main_menu">
                    <img class="item" src="logo.svg"/><h1>QuizMaster</h1>
                    <Link class="item" to="/jugar"><button>Jugar</button></Link>
                    <Link class="item" to="/crear"><button>Crear juego</button></Link>
                </div>
            </div>
        )
    }
}

export default Index