import React, {useState} from "react";
import {useUsuario} from "../Libraries/UserContextLib";
import "../Css/Login.css";
import ConfigurarJuego from "./ConfigurarJuego";

const usuario = useUsuario();
const [email, setEmail] = useState("");

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        setEmail(this.state.name);
        usuario.login(this.state.name, this.state.password);
    }

    render() {
        return (
            <div class="login container">
                <div>
                    <h1>Bienvenido!</h1>
                </div>
                <div>
                    <form>
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

}
export default Login;

