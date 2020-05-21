import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import Index from "./Views/Index.js";
import CrearJuego from "./Views/CrearJuego.js";
import Perfil from "./Views/Profile.js";
import SignUp from "./Views/SignUp";
import Login from "./Views/Login.js";
import Header from "./Components/Header.js";
import { AppContext } from "./libs/contextLib";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const [isAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated }}>
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
    </AppContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
