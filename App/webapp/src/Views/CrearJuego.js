import React, {useEffect, useState} from 'react'
//import CrearPreguntas from "../Components/CrearPreguntas";
import Button from "../Components/Button";
import Input from '../Components/Input'
import '../Css/CrearJuego.css'
import '../Css/CrearJuegoPreguntas.css'
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";
import CrearPreguntas from "../Components/CrearPreguntas";
import {useJuego} from "../Libraries/JuegoContextLib";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useUsuario} from "../Libraries/UserContextLib";
import ConfigurarRespuesta from "../Components/ConfigurarRespuesta";

import update from 'immutability-helper';

export default function CrearJuego() {
    const usuario = useUsuario();
    const juego = useJuego();
    const [id, setId] = useState(null);
    const [preguntas, setPreguntas] = useState([{
        titulo: null,
        segundos: null,
        puntaje: null,
        imgUrl: null,
        activo: false,
        respuestaCorrecta: null,
        respuestas: [null, null, null, null]
    }]);
    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(0);
    const [titulo, setTitulo] = useState(null);
    const [configurandoRespuesta, setConfigurandoRespuesta] = useState(null);

    console.log(QuizMasterService);

    const handleChange = ((event) => {
        setTitulo(event.target.value);
    });

    useEffect(() => {
        juego.setPreguntas(preguntas);
        juego.setTitulo(titulo);
    }, [preguntas, titulo]);

    const crearPregunta = (async (event) => {
        setPreguntas(preguntas.concat({
            titulo: null,
            segundos: null,
            puntaje: null,
            imgUrl: null,
            activo: false,
            respuestaCorrecta: null,
            respuestas: [null, null, null, null]
        }));
    });

    const cambiarTitulo = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {titulo: {$set: _value}}}));
    });

    const cambiarImgUrl = ((_value) => {
        setPreguntas(update(preguntas, {[preguntaSeleccionada]: {imgUrl: {$set: _value}}}));
    });

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

    const obtenerPreguntasDeAPI = (() => {
        console.log("wip");
    });

    const cerrarModalConfigurarRespuesta = (() => {
        setConfigurandoRespuesta(null);
    });

    const publicarJuego = (async () => {
        console.log(usuario.usuario);
        await QuizMasterService.crearJuego({
            "User_loginnameUser": usuario.usuario,
            "tituloJuego": titulo,
            "descripcionJuego": "sample string 4",
            "esPrivadoJuego": 0,
            "coverJuego": "sample string 5",
            "Musica_idMusica": 1,
            "activadoJuego": 1,
            accessToken: usuario.accessToken
        });
    });

    function render() {
        return (
            <div class="container" style={{height: '100%'}}>
                <div class="titleHeader">
                    <input className="input-big mr-10" placeholder="Titulo" onChange={handleChange}
                           value={titulo}/>
                    <Button class="item" to="/configurarJuego" value="Configurar" size="regular"/>
                </div>
                <div className="crearPreguntas">
                    <div className="tablero card mb-20">
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
                        configurarRespuesta={setConfigurandoRespuesta}

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
            </div>
        )
    }

    return render();
}