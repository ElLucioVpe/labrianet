import React, { useState } from "react";
import { useUsuario } from "../Libraries/UserContextLib";
import "../Css/Login.css";

export default function Login() {
  const usuario = useUsuario();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(usuario);

  function validateForm() {
    console.log("WIP");
  }

  function handleSubmit(event) {
    event.preventDefault();

    let username = event.target.elements.name.value;
    let password = event.target.elements.password.value;

    usuario.login(username, password);
  }

  function render() {
    return (
      <div class="login container">
        <div>
          <h1>Bienvenido!</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Usuario"
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="********"
            />
            <p></p>

            <input
              type="submit"
              className="btn-regular input"
              value="Iniciar sesión"
            />
          </form>
        </div>
      </div>
    );
  }

  function login() {}

  return render();
}
