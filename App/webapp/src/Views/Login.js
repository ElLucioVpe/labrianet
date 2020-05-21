import React from 'react'
import { useAppContext } from "../libs/contextLib";

class Login extends React.Component {

    render() {
        return (
            <div class="login">
                <div>
                    <h1>Bienvenido!</h1>
                </div>
                <div>
                    <form>
                        <input type="text" name="name" placeholder="Usuario" />
                        <input type="password" name="password" placeholder="********" />

                        <input type="submit" class="btn-regular" value="Registrarme" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login