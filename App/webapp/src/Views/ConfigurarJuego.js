import React from "react";
import CheckBox from "../Components/CheckBox";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "../Css/ConfigurarJuego.css";
import Select from "react-select";

//array de canciones por defecto, por si ocurre un error
const canciones = [{value: "0", label: "Musica del juego"}];

class ConfigurarJuego extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            privacidad: [
                {id: 1, value: "Público", isChecked: true},
                {id: 2, value: "Privado", isChecked: false},
            ],
            juego: [],
            cancionSeleccionada: {value: "null", label: "Musica del juego"},
        };
    }

    handleChangeMusica = (cancionSeleccionada) => {
        this.setState({cancionSeleccionada});
        //console.log(`Option selected:`, cancionSeleccionada);
    };

    handleCheckChieldElement = (event) => {
        let privacidad = this.state.privacidad;
        privacidad.forEach((item) => {
            if (item.value === event.target.value)
                item.isChecked = event.target.checked;
            else item.isChecked = false;
        });
        this.setState({privacidad: privacidad});
    };

    async componentDidMount() {
        const user = this.context;

        const response = await fetch(
            "http://localhost:44353/api/Juego/GetJuego/" + user.Juego
        );
        const data = await response.json();
        this.setState({juego: data});

        //Modifico los checkbox de privacidad
        let privacidad = this.state.privacidad;
        if (data.esPrivadoJuego === 1) {
            privacidad.forEach((item) => {
                if (item.value === "Privado") item.isChecked = true;
                else item.isChecked = false;
            });
        }
        this.setState({privacidad: privacidad});
        //

        //Cargo select de musica
        const responseM = await fetch("http://localhost:44353/api/Musica/GetAll");
        let data_canciones = await responseM.json();
        data_canciones.forEach((item) => {
            let valor = {value: item.idMusica, label: item.tituloMusica};
            canciones.concat(valor); //deberia ser titulo
            if (item.idMusica === data.Musica_idMusica) {
                this.setState({cancionSeleccionada: valor});
            }
        });
        //
    }

    render() {
        const {cancionSeleccionada} = this.state;

        return (
            <div className="configuracionJuego container">
                <form>
                    <h2>Game Summary</h2>
                    <div className="grid-configuracionJuego">
                        <div className="seccion1-config card">
                            <p>
                                <input
                                    className="input"
                                    type="text"
                                    name="titulo"
                                    placeholder="Titulo"
                                    value={this.state.juego.tituloJuego}
                                />
                            </p>

                            <Input
                                className="descripcion-juego"
                                placeholder="Descripción"
                                type="textarea"
                                rows="10"
                                value={this.state.juego.descripcionJuego}
                                cols="50"
                            ></Input>
                            <br/>

                            <ul>
                                {this.state.privacidad.map((item) => {
                                    return (
                                        <CheckBox
                                            handleCheckChieldElement={this.handleCheckChieldElement}
                                            {...item}
                                        />
                                    );
                                })}
                            </ul>
                            <p>
                                <input
                                    className="input"
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.juego.password}
                                />
                            </p>
                        </div>

                        <div className="seccion2-config card">
                            <img
                                id="gamecover"
                                width="450"
                                height="300"
                                src={"../../public/img/" + this.state.juego.coverJuego}
                                placeholder="GameCover"
                                placeholder="GameCover"
                            />
                            <br/>

                            <Select
                                value={cancionSeleccionada}
                                onChange={this.handleChangeMusica}
                                options={canciones}
                            />
                        </div>
                    </div>

                    <div className="configuracionJuego-submit mt-20">
                        <input type="submit" className="btn-regular" value="OK"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ConfigurarJuego;
