import React, {useEffect, useState} from 'react'
import Button from "../Components/Button";
import SubirImagenVideo from "../Components/SubirImagenVideo";
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";
import CrearPreguntas from "../Components/CrearPreguntas";
import {useJuego} from "../Libraries/JuegoContextLib";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useUsuario} from "../Libraries/UserContextLib";
import ConfigurarRespuesta from "../Components/ConfigurarRespuesta";
import update from 'immutability-helper';
import Enlace from "./Enlace";

import '../Css/CrearJuego.css'
import '../Css/CrearJuegoPreguntas.css'
import ResumenJuego from "./ResumenJuego";

export default function CrearJuego() {
    const usuario = useUsuario();
    const juego = useJuego();
    const [titulo, setTitulo] = useState(juego.titulo);
    const [juegoCreado, setJuegoCreado] = useState(false);
    const [preguntas, setPreguntas] = useState(juego.preguntas);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(0);
    const [configurandoRespuesta, setConfigurandoRespuesta] = useState(null);
    const [mostrarSubirImagen, setMostrarSubirImagen] = useState(null);

    const handleChange = ((event) => {
        setTitulo(event.target.value);
    });

    useEffect(() => {
        juego.setPreguntas(preguntas);
        juego.setTitulo(titulo);
        //juego.setIdJuego(0);
    }, [preguntas, setPreguntas, titulo, setTitulo]);

    const crearPregunta = (async (event) => {
        setPreguntas(preguntas.concat({
            titulo: null,
            segundos: null,
            puntaje: null,
            imgUrl: null,
            activo: false,
            startAyuda: 0,
            endAyuda: 0,
            respuestaCorrecta: null,
            respuestas: [null, null, null, null]
        }));
    });

    const cambiarTitulo = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {titulo: {$set: _value}}}));
    });

    const cambiarImgUrl = ((e) => {
        //setPreguntas(update(preguntas, {[preguntaSeleccionada]: {imgUrl: {$set: _value}}}));
        subirImagen(e);
    });

    const cambiarYouTubeUrl = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {imgUrl: {$set: _value}}}));
    });

    const cambiarStartAyuda = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {startAyuda: {$set: _value}}}));
    });

    const cambiarEndAyuda = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {endAyuda: {$set: _value}}}));
    });

    function convertirAyuda(_value) {
        //Funcion simple para que pueda ingresar en formato min:seg
        let retorno = 0;

        if (_value === undefined) return retorno; //Evito errores si se publica sin hacer nada aqui
        if (!isNaN(parseFloat(_value)) && !isNaN(_value - 0)) retorno = _value;
        else{
            if (_value.includes(":")) {
                let num1 = _value.substring(0, _value.indexOf(":"));
                let num2 = _value.substring(_value.indexOf(":") + 1);
                console.log(num1 + "-" + num2);
                _value = num1 + num2;
                if (!isNaN(parseFloat(_value)) && !isNaN(_value - 0)) retorno = (num1 * 60) + num2;
                else retorno = 0;
            } else retorno = _value;
        }
        return retorno;
    }

    function subirImagen(event) {
        let filesSelected = event.target.files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                //juego.setCoverJuego(fileLoadedEvent.target.result);
                setPreguntas(update(preguntas, {[preguntaSeleccionada]: {imgUrl: {$set: fileLoadedEvent.target.result}}}));
                juego.setCoverEsVideo(false);
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    const cambiarSegundos = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {segundos: {$set: _value}}}));
    });

    const cambiarPuntaje = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {puntaje: {$set: _value}}}));
    });

    const cambiarRespuestaCorrecta = (() => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {respuestaCorrecta: {$set: configurandoRespuesta}}}));
    });

    const cambiarPregunta = (async (id) => {
        setPreguntaSeleccionada(id);
    });

    const handleClickPublicarJuego = (async (id) => {
        publicarJuego();
    });

    const eliminarPregunta = (async (id) => {
        if (preguntas.length > 1) {
            if (preguntas.length === 2) {
                await cambiarPregunta(0);
            }
            await setPreguntas(preguntas.filter((_, i) => i !== id));
        }
    });

    const cambiarRespuesta = ((_respuesta) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {respuestas: {[configurandoRespuesta]: {$set: _respuesta}}}}));
    });

    const configurarRespuesta = ((respuesta) => {
        setConfigurandoRespuesta(respuesta);
    });

    const abrirModalSubirImagenVideo = ((respuesta) => {
        setMostrarSubirImagen(respuesta);
    });

    const cerrarModalConfigurarRespuesta = (() => {
        setConfigurandoRespuesta(null);
    });

    const cerrarModalSubirImagenVideo = (() => {
        setMostrarSubirImagen(null);
    });

    const publicarJuego = (async () => {
        var dataJuego = {
            "User_loginnameUser": usuario.usuario,
            "tituloJuego": (juego.titulo || "Titulo"),
            "descripcionJuego": "sample string 4",
            "activadoJuego": 1,
            "coverJuego": juego.coverJuego != null ? juego.coverJuego.substring(22) : "",
            "Musica_idMusica": juego.idMusica != null ? juego.idMusica : "1",
            "esPrivadoJuego": juego.esPrivadoJuego === true ? 0 : 1,
            "accessToken": usuario.accessToken,
            "password": juego.password,
            "preguntas": []
        };
        let xd;
        preguntas.forEach(xd = async function (item, i) {
            let respuestas = [];
            let respuestasSinSetear = 0;
            let respuestaCorrecta = item.respuestaCorrecta;
            await item.respuestas.forEach(function (item, i) {
                if (item != null && item !== "") {
                    respuestas.push({
                        "esCorrectoRespuesta": respuestaCorrecta === i ? 1 : 0,
                        "contenidoRespuesta": item != null ? item : "Respuesta"
                    });
                } else {
                    respuestasSinSetear++;
                }
            });
            await dataJuego.preguntas.push({
                "segundosPregunta": item.segundos != null ? item.segundos : 40,
                "puntosPregunta": item.puntaje != null ? item.puntaje : 100,
                "contenidoPregunta": item.titulo != null ? item.titulo : "Pregunta",
                "tipoPregunta": respuestasSinSetear === 2 ? "True/False" : "Quiz",
                "urlAyudaPregunta": item.imgUrl != null ? item.imgUrl.substring(22) : "",
                "startAyuda": convertirAyuda(item.startAyuda),
                "endAyuda": convertirAyuda(item.endAyuda),
                "respuestas": respuestas
            });
        });
        let id = await QuizMasterService.crearJuego(dataJuego);
        await setJuegoCreado(true);
        await juego.setIdJuego(id);
    });

    function uploadFile(event) {
        let file = event.target.files[0];
        console.log(file);

        if (file) {
            let data = new FormData();
            data.append('file', file);
            // axios.post('/files', data)...
        }
    }

    function render() {
        return (
            juegoCreado ? <ResumenJuego id={juego.idJuego}/> : <div className="container" style={{height: '100%'}}>
                <div className="titleHeader">
                    <input className="input-big mr-10" placeholder="Titulo" onChange={handleChange}
                           value={titulo}/>
                    <Button class="item" to="/configurarJuego" value="Configurar" size="regular"/>
                </div>
                <div className="crearPreguntas">
                    <div className="tablero card">
                        <div>
                            <h2>Tablero</h2>
                        </div>
                        <div className="inner-tablero">
                            {preguntas.map((pregunta, i) => <CrearJuegoPreguntas
                                key={i} id={i} className={preguntaSeleccionada === i ? 'selected' : ''}
                                onClick={(e) => cambiarPregunta(i, e)}
                                eliminarPregunta={eliminarPregunta}
                                mostrarCerrar={preguntas.length > 1} {...pregunta}/>)}
                        </div>
                        <div>
                            <button className="mt-10 btn-regular"
                                    onClick={crearPregunta}>Nueva
                            </button>
                        </div>
                    </div>
                    <CrearPreguntas
                        cambiarTitulo={cambiarTitulo}
                        cambiarPregunta={cambiarPregunta}
                        cambiarPuntaje={cambiarPuntaje}
                        cambiarSegundos={cambiarSegundos}
                        cambiarStartAyuda={cambiarStartAyuda}
                        cambiarEndAyuda={cambiarEndAyuda}
                        configurarRespuesta={setConfigurandoRespuesta}
                        abrirSubirImagenVideo={abrirModalSubirImagenVideo}
                        subirImagen={subirImagen}
                        posicionPregunta={preguntaSeleccionada}

                        {...preguntas[preguntaSeleccionada]}/>
                </div>
                <div className="flex justify-content-end mt-20">
                    <Button className="item" size="regular" status="confirm" value="Publicar"
                            onClick={handleClickPublicarJuego}/>
                </div>
                {configurandoRespuesta === null ? '' :
                    <ConfigurarRespuesta cerrarModal={cerrarModalConfigurarRespuesta}
                                         cambiarRespuesta={cambiarRespuesta}
                                         cambiarRespuestaCorrecta={cambiarRespuestaCorrecta}
                                         respuesta={preguntas[preguntaSeleccionada].respuestas[preguntas[preguntaSeleccionada].configurarRespuesta]}
                                         esCorrecta={preguntas[preguntaSeleccionada].respuestaCorrecta}
                    />}
                {mostrarSubirImagen === null ? '' :
                    <SubirImagenVideo cerrarModal={cerrarModalSubirImagenVideo}
                                      cambiarImagen={cambiarImgUrl}
                                      cambiarYouTubeUrl={cambiarYouTubeUrl}
                                      respuesta={preguntas[preguntaSeleccionada].respuestas[preguntas[preguntaSeleccionada].mostrarSubirImagen]}
                    />}
            </div>
        )
    }

    return render();
}