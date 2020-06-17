import React, {useEffect, useState} from "react";
import {useUsuario} from "../Libraries/UserContextLib";
import "../Css/Login.css";
import {Redirect} from 'react-router'
import Button from "../Components/Button";

export default function Login() {
    const usuario = useUsuario();
    const [password, setPassword] = useState(false);

    function validateForm() {
        console.log("WIP");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let username = event.target.elements.username.value;
        let password = event.target.elements.password.value;

        await setPassword(password);
        await usuario.setUsuario(username);
    }

    useEffect(() => {
        if (usuario.usuario !== "") {
            usuario.login(usuario.usuario, password)
        }
    }, [usuario.usuario]);

    function LoginRender() {
        return (<div className="login container">
            <div>
                <h1>Bienvenido!</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        placeholder="Usuario"
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="********"
                    />

                    <button type="submit" className="btn-regular">Iniciar sesión</button>
                </form>
            </div>
        </div>);
    }

    function render() {
        return (
            <div class="login container">
                {usuario.inicioSesion
                    ? <Redirect to="/"/>
                    : <LoginRender/>
                }
            </div>
        )
    }


    return render();
}