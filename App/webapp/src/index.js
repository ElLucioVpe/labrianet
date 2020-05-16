import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Index from './Views/Index.js'
import CrearJuego from './Views/CrearJuego.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route path="/crear">
                        <CrearJuego />
                    </Route>
                    <Route path="/jugar">
                        <CrearJuego />
                    </Route>
                </Switch>
            </div>
        </Router>    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)