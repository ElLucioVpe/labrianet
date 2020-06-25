import React, {useEffect, useState} from "react";
import Input from "../Components/Input";
import Select from "react-select";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useJuego} from "../Libraries/JuegoContextLib";
import {BrowserRouter as useLocation} from "react-router-dom";

import "../Css/ConfigurarJuego.css";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ConfigurarJuego(props) {
    const [canciones, setCanciones] = useState([]);
    const [esPrivadoJuego, setEsPrivadoJuego] = useState(true);
    const [juego, setJuego] = useState([]);
    const [esContext, setEsContext] = useState(false);

    const juego_context = useJuego();

    const handleChangeMusica = ((event) => {
        esContext ? juego.setCancionSeleccionada(event.target.value) : juego_context.setCancionSeleccionada(event.target.value);
    });

    useEffect(() => {
        setCanciones([{value: "0", label: "Musica del juego"}]);

        if ((props.match != null) && (juego_context.idJuego == null)) {
            let data = QuizMasterService.obtenerJuego({"id": props.match.params.id});
            setJuego(data);
            setEsContext(false);
        } else if (juego_context.idJuego != null) {
            setEsContext(true);
        }
        doIt();

        async function doIt() {
            let tmpCanciones = canciones;
            let data_canciones = await QuizMasterService.obtenerListadoMusica();
            await data_canciones.forEach((item) => {
                let valor = {value: item.idMusica, label: item.tituloMusica};
                tmpCanciones.push(valor);
                if (item.idMusica === juego.idMusica) {
                    esContext ? juego.setCancionSeleccionada(valor) : juego_context.setCancionSeleccionada(valor);
                }
            });
            await setCanciones(tmpCanciones);
        }

    }, []);

    const handleChangeDescripcion = ((event) => {
        esContext ? juego.setDescripcion(event.target.value) : juego_context.setDescripcion(event.target.value);
    });

    const cambiarImagen = ((_value) => {
        juego.set(_value);
    });

    const cambiarPrivacidad = ((event) => {
        esContext ? juego.setEsPrivadoJuego(event.target.checked) : juego_context.setEsPrivadoJuego(event.target.checked);
    });

    const cambiarMusica = ((_value) => {
        juego.set(_value);
    });

    const cambiarPassword = ((event) => {
        esContext ? juego.setPassword(event.target.value) : juego_context.setPassword(event.target.value);
    });

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
                                    defaultChecked={esContext ? juego.titulo : juego_context.titulo}
                                />
                            </p>

                            <Input
                                classList="descripcion-juego"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripción"
                                type="textarea"
                                rows="10"
                                value={esContext ? juego.descripcion : juego_context.descripcion}
                                onChange={handleChangeDescripcion}
                                cols="50"
                            />
                            <br/>

                            <ul>
                                <li>
                                    <input onChange={cambiarPrivacidad} type="checkbox"
                                           defaultValue={esContext ? juego.esPrivadoJuego : juego_context.esPrivadoJuego}
                                    /> <label>Es privado</label>
                                </li>
                            </ul>
                            <p>
                                <input
                                    className="input"
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={juego.password}
                                    onChange={cambiarPassword}
                                />
                            </p>
                        </div>

                        <div className="seccion2-config card">
                            <img
                                class="gamecoverImage"
                                id="gamecover"
                                width="450"
                                height="300"
                                src={"/img/" + (esContext ? juego.coverJuego : juego_context.coverJuego)}
                                placeholder="GameCover"
                            />
                            <br/>

                            <Select
                                value={juego.cancionSeleccionada}
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