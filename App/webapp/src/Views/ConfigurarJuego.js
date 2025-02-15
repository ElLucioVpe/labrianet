import React, {useEffect, useRef, useState} from "react";
import Input from "../Components/Input";
import Select from "react-select";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useJuego} from "../Libraries/JuegoContextLib";
import Button from "../Components/Button";
import SubirImagenVideo from "../Components/SubirImagenVideo";
import ReactPlayer from "react-player";

import '../Css/ConfigurarJuego.css'
import {useUsuario} from "../Libraries/UserContextLib";

export default function ConfigurarJuego(props) {
    const [canciones, setCanciones] = useState([]);
    const [juego, setJuego] = useState([]);
    const [esContext, setEsContext] = useState(true);
    const inputFile = useRef(null);
    const [mostrarSubirImagen, setMostrarSubirImagen] = useState(null);
    const [cancionSeleccionada, setCancionSeleccionada] = useState(0);
    const [privacidad, setPrivacidad] = useState(0);
    const [imageUrl, setImageUrl] = useState("img/gamecover.png");

    const usuario = useUsuario();
    const juego_context = useJuego();

    const handleChangeMusica = ((event) => {
        //console.log(event);
        setCancionSeleccionada(event);
        !esContext ? juego.Musica_idMusica = event.value : juego_context.setCancionSeleccionada(event.value);
    });

    useEffect(() => {
        setCanciones([{value: "null", label: "Musica del juego"}]);

        async function doIt() {
            if ((props.match != null) ) {
                let data = await QuizMasterService.obtenerJuego({id: props.match.params.id});

                await setJuego(data);
                //console.log(data);
                setImageUrl(QuizMasterService.getUrlImagen("cover", data.coverJuego))
                setPrivacidad(data.esPrivadoJuego);
                setEsContext(false);
            } else if (juego_context.idJuego != null) {
                setPrivacidad(juego_context.esPrivadoJuego);
                setEsContext(true);
            }

            let tmpCanciones = canciones;
            let data_canciones = await QuizMasterService.obtenerListadoMusica();
            await data_canciones.forEach((item) => {
                let valor = {value: item.idMusica, label: item.tituloMusica};
                tmpCanciones.push(valor);
                if ((props.match != null) && (juego_context.idJuego == null)) {
                    setCancionSeleccionada(valor);
                } else juego_context.setCancionSeleccionada(valor);
            });
            await setCanciones(tmpCanciones);
        }

        doIt();

    }, []);

    const handleChangeDescripcion = ((event) => {
        !esContext ? juego.descripcionJuego = event.target.value : juego_context.setDescripcion(event.target.value);
    });

    const handleChangeTitulo = ((event) => {
        !esContext ? juego.tituloJuego = event.target.value : juego_context.setTitulo(event.target.value);
    });

    const cambiarPrivacidad = ((event) => {
        !esContext ? juego.esPrivadoJuego = event.target.checked : juego_context.setEsPrivadoJuego(event.target.checked);
        setPrivacidad(event.target.checked);
    });

    const cambiarPassword = ((event) => {
        !esContext ? juego.password = event.target.value : juego_context.setPassword(event.target.value);
    });

    const handleClickImage = (() => {
        inputFile.current.click();
    });

    const onImageChange = ((e) => {
        subirImagen(e);
    });

    const esVideo = (() => {
        if ((!esContext ? juego.coverJuego : juego_context.coverJuego) != null) {
            if ((!esContext ? juego.coverJuego : juego_context.coverJuego).slice(0, 8) === "https://") {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    function subirImagen(event) {
        let filesSelected = event.target.files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                !esContext ? juego.coverJuego = fileLoadedEvent.target.result.substring(fileLoadedEvent.target.result.indexOf(',',0)+1) : juego_context.setCoverJuego(fileLoadedEvent.target.result);
                console.log(fileLoadedEvent.target.result);
                if (esContext) juego_context.setCoverEsVideo(false);
                else setImageUrl(fileLoadedEvent.target.result);
                //console.log(juego);
            };
            fileReader.readAsDataURL(fileToLoad)
        }
    }

    function verificarUsuario() {
        if (!esContext && juego !== []) {
            if (usuario.usuario !== juego.User_loginnameUser) window.location = "/";
        }
    }

    const cerrarModalSubirImagenVideo = (() => {
        setMostrarSubirImagen(null);
    });

    const abrirModalSubirImagenVideo = ((respuesta) => {
        setMostrarSubirImagen(respuesta);
    });

    const updateJuego = (async () => {
        if (juego.esPrivadoJuego === true) juego.esPrivadoJuego = 1;
        else if (juego.esPrivadoJuego === false) juego.esPrivadoJuego = 0;

        await QuizMasterService.updateJuego({juego: juego, accessToken: usuario.accessToken}).then(() =>
        {
            alert("El juego fue actualizado");
        });
    });

    function render() {
        verificarUsuario();
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
                                    defaultValue={!esContext ? juego.tituloJuego : juego_context.titulo}
                                    onChange={handleChangeTitulo}
                                />
                            </p>

                            <Input
                                classList="descripcion-juego"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripción"
                                type="textarea"
                                rows="10"
                                value={!esContext ? juego.descripcionJuego : juego_context.descripcion}
                                onChange={handleChangeDescripcion}
                                cols="50"
                            />
                            <br/>

                            <ul>
                                <li>
                                    <input name="privacidad" onChange={cambiarPrivacidad} type="checkbox"
                                               checked={privacidad}/>
                                    <label for="privacidad" >Es privado</label>
                                </li>
                            </ul>
                            <p>
                                <input
                                    className="input"
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    defaultValue={!esContext ? juego.password : juego_context.password}
                                    onChange={cambiarPassword}
                                />
                            </p>
                        </div>

                        <div className="seccion2-config card ">
                            <div className="relative width-inherit text-align-center"
                                 onClick={abrirModalSubirImagenVideo}>
                                {
                                    esVideo() ? <ReactPlayer
                                        url={(!esContext ? juego.coverJuego : juego_context.coverJuego) != null ? (!esContext ? juego.coverJuego : juego_context.coverJuego) : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                                    /> : <img className="gamecoverImage"
                                              id="gamecover"
                                              width="450"
                                              height="300"
                                              src={((!esContext ? juego.coverJuego : juego_context.coverJuego) != null && (!esContext ? juego.coverJuego : juego_context.coverJuego)) ? (!esContext ? imageUrl : juego_context.coverJuego) : 'img/gamecover.png'}/>
                                }
                                <div className="absolute imgUpload" onClick={handleClickImage}>
                                    <img className="editImg"
                                         src="/views/crear/upload.svg"/>
                                </div>
                            </div>
                            <br/>

                            <Select
                                value={!esContext ? cancionSeleccionada : juego_context.cancionSeleccionada}
                                onChange={handleChangeMusica}
                                options={canciones}
                            />
                        </div>
                    </div>

                    <div className="configuracionJuego-submit mt-20">
                        {
                            esContext ?
                                <Button size="regular" value="Volver" to="/crear"/> :
                                <Button size="regular" value="Guardar" onClick={updateJuego}/>
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