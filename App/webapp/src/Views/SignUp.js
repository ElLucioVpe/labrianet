import React, {useState} from "react";
import {useUsuario} from "../Libraries/UserContextLib";
import Input from "../Components/Input";

export default function SignUp() {
    const usuario = useUsuario();
    const [username, seUsername] = useState("");
    console.log(usuario);

    function handleSubmit(event) {
        event.preventDefault();
        let username = event.target.elements.username.value;
        let nickuser = event.target.elements.nickuser.value;
        let password = event.target.elements.password.value;
        let fecha = "some fecha xd";

        usuario.signup(username, nickuser, password, fecha);
    }

    function render() {
        return (
            <div class="login container">
                <div>
                    <h1>Únete y empieza a jugar!</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <Input type="text" name="username" placeholder="Usuario"/>
                        <Input type="text" name="nickuser" placeholder="Nick"/>
                        <Input type="password" name="password" placeholder="********"/>

                        <button type="submit" className="btn-regular">Registrarme
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return render();
}