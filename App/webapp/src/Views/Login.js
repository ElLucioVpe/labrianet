import React from "react";
import UserContext from "../Libraries/contextLib";
import '../Css/Login.css';

class Login extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.name === "name") this.setState({name: event.target.value});
        if(event.target.name === "password") this.setState({password: event.target.value});
    }

    async comprobarLogin(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:44353/token', {
            method: 'POST',
            body: 'grant_type=password&username=' + this.state.name +
                '&password=' + this.state.password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        process.env['API_TOKEN'] = await response.json().access_token;
    }

    render() {
        return (
            <div class="login container">
                <div>
                    <h1>Bienvenido!</h1>
                </div>
                <div>
                    <form onSubmit={this.comprobarLogin()} >
                        <input class="input" type="text" value={this.state.name} onChange={this.handleChange} name="name" placeholder="Usuario"/>
                        <input class="input" type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="********"/>

                        <input class="input" type="submit" class="btn-regular" value="Registrarme"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
