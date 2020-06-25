import React, {useEffect, useRef, useState} from "react";
import Input from "../Components/Input";
import Select from "react-select";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useJuego} from "../Libraries/JuegoContextLib";
import {BrowserRouter as useLocation} from "react-router-dom";

import "../Css/ConfigurarJuego.css";
import Button from "../Components/Button";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ConfigurarJuego(props) {
    const [canciones, setCanciones] = useState([]);
    const [juego, setJuego] = useState([]);
    const [esContext, setEsContext] = useState(true);
    const inputFile = useRef(null);

    const juego_context = useJuego();

    const handleChangeMusica = ((event) => {
        //console.log(event);
        !esContext ? juego.setCancionSeleccionada(event.value) : juego_context.setCancionSeleccionada(event.value);
    });

    useEffect(() => {
        setCanciones([{value: "0", label: "Musica del juego"}]);

        if ((props.match != null) && (juego_context.idJuego == null)) {
            let data = QuizMasterService.obtenerJuego({"id": props.match.params.id});
            setJuego(data);
            setEsContext(false);
            console.log("wtf!?");
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
                    !esContext ? juego.setCancionSeleccionada(valor) : juego_context.setCancionSeleccionada(valor);
                }
            });
            await setCanciones(tmpCanciones);
        }

    }, []);

    const handleChangeDescripcion = ((event) => {
        !esContext ? juego.setDescripcion(event.target.value) : juego_context.setDescripcion(event.target.value);
    });

    const cambiarImagen = ((_value) => {
        juego.set(_value);
    });

    const cambiarPrivacidad = ((event) => {
        !esContext ? juego.setEsPrivadoJuego(event.target.checked) : juego_context.setEsPrivadoJuego(event.target.checked);
    });

    const cambiarMusica = ((_value) => {
        juego.set(_value);
    });

    const cambiarPassword = ((event) => {
        !esContext ? juego.setPassword(event.target.value) : juego_context.setPassword(event.target.value);
    });

    function subirImagen(event) {
        let filesSelected = event.target.files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                !esContext ? juego.setCoverJuego(fileLoadedEvent.target.result) : juego_context.setCoverJuego(fileLoadedEvent.target.result);
                !esContext ? juego.setCoverEsVideo(false) : juego_context.setCoverEsVideo(false);
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    const handleClickImage = (() => {
        inputFile.current.click();
    });

    const onImageChange = ((e) => {
        //esContext ? juego.setCoverJuego(e.target.files[0]) : juego_context.setCoverJuego(e.target.files[0]);
        subirImagen(e);
        //this.onImageSubmit()
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
                                    defaultChecked={!esContext ? juego.titulo : juego_context.titulo}
                                />
                            </p>

                            <Input
                                classList="descripcion-juego"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripción"
                                type="textarea"
                                rows="10"
                                value={!esContext ? juego.descripcion : juego_context.descripcion}
                                onChange={handleChangeDescripcion}
                                cols="50"
                            />
                            <br/>

                            <ul>
                                <li>
                                    <input onChange={cambiarPrivacidad} type="checkbox"
                                           defaultValue={!esContext ? juego.esPrivadoJuego : juego_context.esPrivadoJuego}
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

                        <div className="seccion2-config card ">
                            <div className="relative width-inherit" onClick={handleClickImage}>
                                <img
                                    class="gamecoverImage"
                                    id="gamecover"
                                    width="450"
                                    height="300"
                                    src={(!esContext ? juego.coverJuego : juego_context.coverJuego) != null ? (!esContext ? juego.coverJuego : juego_context.coverJuego) : 'img/perfil.png'}
                                    onChange={subirImagen}
                                />
                                <div className="absolute imgUpload">
                                    <img className="editImg"
                                         src="/views/crear/upload.svg"/>
                                </div>
                            </div>
                            <br/>

                            <Select
                                defaultValue={(!esContext ? juego.cancionSeleccionada : juego_context.cancionSeleccionada) != null ? (!esContext ? juego.cancionSeleccionada : juego_context.cancionSeleccionada) : ''}
                                onChange={handleChangeMusica}
                                options={canciones}
                            />
                        </div>
                    </div>

                    <div className="configuracionJuego-submit mt-20">
                        {
                            esContext ?
                                <Button size="regular" value="Volver" to="/crear"/> :
                                <Button size="regular" value="Guardar" to="/configurarJuego"/>
                        }
                    </div>

                </form>
                <form className="display-none">
                    <input type="file" onChange={onImageChange} ref={inputFile}/>
                </form>
            </div>
        );
    }

    return render();
}