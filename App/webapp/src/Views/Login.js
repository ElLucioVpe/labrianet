import React from "react";
import UserContext from "../Libraries/ContextLib";
import '../Css/Login.css';

class Login extends React.Component {
    static contextType = UserContext

    componentDidMount() {
        const user = this.context

        console.log(user)
    }

    render() {
        return (
            <div class="login">
                <div>
                    <h1>Bienvenido!</h1>
                </div>
                <div>
                    <form>
                        <input class="input" type="text" name="name" placeholder="Usuario"/>
                        <input class="input" type="password" name="password" placeholder="********"/>

                        <input class="input" type="submit" class="btn-regular" value="Registrarme"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
