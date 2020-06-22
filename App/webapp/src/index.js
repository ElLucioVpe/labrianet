import React, {Component, useContext, useState} from "react";
import ReactDOM from "react-dom";
import Index from "./Views/Index.js";
import CrearJuego from "./Views/CrearJuego.js";
import Perfil from "./Views/Profile.js";
import SignUp from "./Views/SignUp";
import Login from "./Views/Login.js";
import ConfigurarJuego from "./Views/ConfigurarJuego.js";
import PlayerRanking from "./Views/PlayerRanking.js";
import Header from "./Components/Header.js";
import Loading from "./Components/Loading.js";
import Grafica from "./Views/Grafica.js";
import Enlace from "./Views/Enlace.js";
import Resumenjuego from "./Views/ResumenJuego";
import {UsuarioProvider, useUsuario} from "./Libraries/UserContextLib";
import {JuegoProvider, useJuego} from "./Libraries/JuegoContextLib";
import ThemeContext, {ThemeProvider} from "./Libraries/ThemeContextLib";
import "./App.css";
import Prejuego from "./Views/PreJuego.js"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Jugar from "./Views/Jugar";
import Logout from "./Views/Logout";
import PreJuego from "./Views/PreJuego";

function QuizMaster() {
    return (
        <ThemeProvider>
            <UsuarioProvider>
                <JuegoProvider>
                    <App></App>
                </JuegoProvider>
            </UsuarioProvider>
        </ThemeProvider>
    );
}

function App() {
    const [error, setError] = useState(null);
    const {cargandoUsuario, usuario, login, signup, logout} = useUsuario();
    const {dark} = useContext(ThemeContext);
    const {id_juego, juegoTemp, cargarJuego, cargarJuegoTemp} = useJuego();

    function mostrarError(mensaje) {
        setError(mensaje);
    }

    function esconderError() {
        setError(null);
    }

    if (cargandoUsuario) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Index/>
                </Route>
                <Route path="/crear">
                    <CrearJuego/>
                </Route>
                <Route path="/enlace">
                    <Enlace/>
                </Route>
                <Route path="/jugar">
                    <Jugar/>
                </Route>
                <Route path="/playerRanking">
                    <PlayerRanking/>
                </Route>
                <Route path="/grafica">
                    <Grafica/>
                </Route>
                <Route path="/perfil">
                    <Perfil/>
                </Route>
                <Route path="/registro">
                    <SignUp/>
                </Route>
                <Route path="/prejuego">
                    <PreJuego/>
                </Route>

                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/logout">
                    <Logout/>
                </Route>
                <Route path="/configurarJuego/:id">
                    <ConfigurarJuego/>
                </Route>
                <Route path="/configurarJuego">
                    <ConfigurarJuego/>
                </Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <QuizMaster/>,
    document.getElementById("root")
);
