import React, { Component, useContext, useState } from "react";
import ReactDOM from "react-dom";
import Index from "./Views/Index.js";
import CrearJuego from "./Views/CrearJuego.js";
import Perfil from "./Views/Profile.js";
import SignUp from "./Views/SignUp";
import Login from "./Views/Login.js";
import ConfigurarJuego from "./Views/ConfigurarJuego.js";
import ComienzoJuego from "./Views/ComienzoJuego";
import PlayerRanking from "./Views/PlayerRanking.js";
import Header from "./Components/Header.js";
import Loading from "./Components/Loading.js";
import Grafica from "./Views/Grafica.js";
import { UsuarioProvider, useUsuario } from "./Libraries/UserContextLib";
import {JuegoProvider, useJuego} from "./Libraries/JuegoContextLib";
import ThemeContext, { ThemeProvider } from "./Libraries/ThemeContextLib";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default () => (
  <ThemeProvider>
    <UsuarioProvider>
      <JuegoProvider>
        <App></App>
      </JuegoProvider>
    </UsuarioProvider>
  </ThemeProvider>
);

function App() {
  const [error, setError] = useState(null);
  const { cargandoUsuario, usuario, login, signup, logout } = useUsuario();
  const { dark } = useContext(ThemeContext);
  const { id_juego, juegoTemp, cargarJuego, cargarJuegoTemp} = useJuego();

  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function esconderError() {
    setError(null);
  }

  if (cargandoUsuario) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Header />
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
        <Route path="/playerRanking">
          <PlayerRanking />
        </Route>
        <Route path="/grafica">
          <Grafica />
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
        <Route path="/configurarJuego:id" component={ConfigurarJuego}>
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <ThemeProvider>
    <UsuarioProvider>
      <JuegoProvider>
        <App></App>
      </JuegoProvider>
    </UsuarioProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
