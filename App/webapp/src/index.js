import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Index from './Views/Index.js'
import CrearJuego from './Views/CrearJuego.js'
import Perfil from './Views/Profile.js'
import SignUp from './Views/SignUp'
import Login from './Views/Login.js'
import Enlace from './Views/Enlace.js'
import ComienzoJuego from './Views/ComienzoJuego.js'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/crear">
                    <CrearJuego />
                </Route>
                <Route path="/enlace">
                    <Enlace/>
                </Route>
                <Route path="/comienzojuego">
                    <ComienzoJuego />
                </Route>
                <Route path="/jugar">
                    <CrearJuego />
                </Route>
                <Route path="/perfil">
                    <Perfil />
                </Route>
                <Route path="/registro">
                    <SignUp />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)