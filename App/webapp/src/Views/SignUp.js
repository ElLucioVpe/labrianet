import React, {useState, useEffect} from "react";
import {useUsuario} from "../Libraries/UserContextLib";
import Input from "../Components/Input";
import Button from "../Components/Button";

export default function SignUp() {
    const usuario = useUsuario();
    const [userCreated, setUserCreated] = useState(false);
    const [password, setPassword] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        let username = event.target.elements.username.value;
        let nickuser = event.target.elements.nickuser.value;
        let password = event.target.elements.password.value;
        let fecha = "2020-06-12T00:18:23.010363-03:00";

        await usuario.setNickname(nickuser);
        await usuario.setFechaUser(fecha);
        await setPassword(password);
        await usuario.setUsuario(username);
    }

    useEffect(() => {
        if (usuario.usuario !== "") {
            if (usuario.signUp(usuario.usuario, usuario.nickname, password, usuario.fechaUser)) {
                setUserCreated(true);
            }
        }
    }, [usuario.usuario]);

    function render() {
        return (
            <div class="login container">
                {userCreated
                    ? <WelcomeScreen/>
                    : <LoginForm/>
                }
            </div>
        )
    }

    function LoginForm() {
        return (
            <div>
                <div>
                    <h1>Únete y empieza a jugar!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input type="text" name="username" placeholder="Usuario"/>
                    <Input type="text" name="nickuser" placeholder="Nick"/>
                    <Input type="password" name="password" placeholder="********"/>

                    <button type="submit" className="btn-regular">Registrarme</button>
                </form>
            </div>
        )
    }

    function WelcomeScreen() {
        return (
            <div class="card flex flex-direction-column">
                <div className="text-align-center">
                    <img src="/views/signup/partido.svg" alt/>
                </div>
                <div class="text-align-center mt-10">
                    <h1>Gracias por unirte a nuestra comunidad, {usuario.usuario}!</h1>
                </div>
                <div className="text-align-center mt-10">
                    <Button value="Empieza a jugar!" to="/"></Button>
                </div>
            </div>
        )
    }

    return render();
}