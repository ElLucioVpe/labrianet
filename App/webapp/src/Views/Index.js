import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CrearJuego from "./CrearJuego";

class Index extends React.Component {
    render() {
        return (
            <div>
                <h1>QuizMaster</h1>
                <Link to="/jugar"><button>Jugar</button></Link>
                <Link to="/crear"><button>Crear juego</button></Link>
            </div>
        )
    }
}

export default Index