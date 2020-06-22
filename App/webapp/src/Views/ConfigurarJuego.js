import React, {useEffect, useState} from "react";
import CheckBox from "../Components/CheckBox";
import Input from "../Components/Input";
import Select from "react-select";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useJuego} from "../Libraries/JuegoContextLib";
import {BrowserRouter as useLocation} from "react-router-dom";


import "../Css/ConfigurarJuego.css";

//array de canciones por defecto, por si ocurre un error
const canciones = [{value: "0", label: "Musica del juego"}];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ConfigurarJuego(props) {
    const [privacidad, setPrivacidad] = useState([
        {id: 1, value: "Público", isChecked: true},
        {id: 2, value: "Privado", isChecked: false},
    ]);
    const [juego, setJuego] = useState([]);
    const [cancionSeleccionada, setCancionSeleccionada] = useState({value: "null", label: "Musica del juego"});

    const juego_context = useJuego();
    //let query = useQuery();

    const handleChangeMusica = ((cancionSeleccionada) => {
        setCancionSeleccionada(cancionSeleccionada);
    });

    const handleCheckChieldElement = ((event) => {
        let tmpPrivacidad = privacidad;
        privacidad.forEach((item) => {
            if (item.value === event.target.value)
                item.isChecked = event.target.checked;
            else item.isChecked = false;
        });
        setPrivacidad(tmpPrivacidad);
    });

    useEffect(() => {
        if ((props.match.params.id != null) && (juego_context.juegoTemp == null)) {
            let data = QuizMasterService.obtenerJuego({"id": props.match.params.id});
            setJuego(data);
        } else if (juego_context.juegoTemp != null) {
            setJuego(juego_context.juegoTemp);
        }

        //Modifico los checkbox de privacidad
        let tmpPrivacidad = privacidad;
        if (juego.esPrivadoJuego === 1) {
            tmpPrivacidad.forEach((item) => {
                if (item.value === "Privado") item.isChecked = true;
                else item.isChecked = false;
            });
        }
        setPrivacidad(tmpPrivacidad);

        //Cargo select de musica
        let data_canciones = QuizMasterService.obtenerListadoMusica();
        data_canciones.forEach((item) => {
            let valor = {value: item.idMusica, label: item.tituloMusica};
            canciones.concat(valor); //deberia ser titulo
            if (item.idMusica === juego.Musica_idMusica) {
                setCancionSeleccionada(valor);
            }
        });

    }, []);

    function render() {
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
                                    defaultValue={juego.titulo}
                                />
                            </p>

                            <Input
                                classList="descripcion-juego"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripción"
                                type="textarea"
                                rows="10"
                                value={juego.descripcion}
                                cols="50"
                            />
                            <br/>

                            <ul>
                                {privacidad.map((item) => {
                                    return (
                                        <CheckBox
                                            handleCheckChieldElement={handleCheckChieldElement}
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
                                    value={juego.password}
                                />
                            </p>
                        </div>

                        <div className="seccion2-config card">
                            <img
                                class="gamecoverImage"
                                id="gamecover"
                                width="450"
                                height="300"
                                src={"../../public/img/" + juego.coverJuego}
                                placeholder="GameCover"
                            />
                            <br/>

                            <Select
                                value={cancionSeleccionada}
                                onChange={handleChangeMusica}
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

    return render();
}