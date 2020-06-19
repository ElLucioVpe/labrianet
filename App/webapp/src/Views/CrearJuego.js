import React from 'react'
//import CrearPreguntas from "../Components/CrearPreguntas";
import Button from "../Components/Button";
import Input from '../Components/Input'
import '../Css/CrearJuego.css'
import '../Css/CrearJuegoPreguntas.css'
import CrearJuegoPreguntas from "./CrearJuegoPreguntas";
import CrearPreguntas from "../Components/CrearPreguntas";
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useUsuario} from "../Libraries/UserContextLib";
import ConfigurarRespuesta from "../Components/ConfigurarRespuesta";

import update from 'immutability-helper';

class CrearJuego extends React.Component {
    //static contextType = useUsuario; // Por alguna razon no me deja importar useUsuario en componentes de clases (en componentes funcionales anda 10 de 10)

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            preguntas: [],
            preguntaSeleccionada: 0,
            titulo: "kek",
            configurarRespuesta: null
        };

        this.crearPregunta = this.crearPregunta.bind(this);
        this.cambiarPregunta = this.cambiarPregunta.bind(this);
        this.cambiarTitulo = this.cambiarTitulo.bind(this);
        this.cambiarPuntaje = this.cambiarPuntaje.bind(this);
        this.cambiarSegundos = this.cambiarSegundos.bind(this);
        this.cambiarImgUrl = this.cambiarImgUrl.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.configurarRespuesta = this.configurarRespuesta.bind(this);


    }

    handleChange(event) {
        this.setState({titulo: event.target.value})
    }

    async componentDidMount() {
        const context = this.context;
        /*await QuizMasterService.crearJuego({
            idJuego: null,
            User_loginnameUser: context.usuario,
            tituloJuego: this.state.titulo,
            descripcionJuego: null,
            esPrivadoJuego: true,
            coverJuego: null,
            Musica_idMusica: null,
            activadoJuego: false,
        });*/ // Por alguna razon no me deja usar esta funcion
        console.log(context.usuario);
        await this.crearPregunta();
    }

    async crearPregunta() {
        console.log(this.state.titulo);
        this.setState({
            preguntas: this.state.preguntas.concat({titulo: null, segundos: null, puntaje: null, imgUrl: null})
        })
    }

    cambiarTitulo(_value) {
        this.setState({preguntas: update(this.state.preguntas, {[this.state.preguntaSeleccionada]: {titulo: {$set: _value}}})});
    }

    cambiarImgUrl(_value) {
        this.setState({preguntas: update(this.state.preguntas, {[this.state.preguntaSeleccionada]: {imgUrl: {$set: _value}}})});
    }

    cambiarSegundos(_value) {
        this.setState({preguntas: update(this.state.preguntas, {[this.state.preguntaSeleccionada]: {segundos: {$set: _value}}})});
    }

    cambiarPuntaje(_value) {
        this.setState({preguntas: update(this.state.preguntas, {[this.state.preguntaSeleccionada]: {puntaje: {$set: _value}}})});
    }

    cambiarPregunta(id, pregunta) {
        this.setState({
            preguntaSeleccionada: id
        });
        console.log(id);
    }

    configurarRespuesta(respuesta) {
        console.log("jacoedfsdajkdjsfJKASKJJKDSKJ");
        console.log(respuesta);

        this.setState({
            configurarRespuesta: 1
        });
    }

    obtenerPreguntasDeAPI() {

    }

    subirJuego() {
        QuizMasterService.subirJuego({
            idJuego: this.state.titulo,
            User_loginnameUser: this.state.titulo,
            tituloJuego: this.state.titulo,
            descripcionJuego: this.state.titulo,
            esPrivadoJuego: this.state.titulo,
            coverJuego: this.state.titulo,
            Musica_idMusica: this.state.titulo,
            activadoJuego: this.state.titulo,
        });
    }

    render() {
        return (
            <div class="container" style={{height: '100%'}}>
                <div class="titleHeader">
                    <input className="input-big mr-10" placeholder="Titulo" onChange={this.handleChange.bind(this)}
                           value={this.state.titulo}/>
                    <Button class="item" to="/login" value="Configurar" size="regular"/>
                </div>
                <div className="crearPreguntas">
                    <div className="tablero card">
                        <div>
                            <h2>Tablero</h2>
                        </div>
                        <div className="inner-tablero">
                            {this.state.preguntas.map((pregunta, i) => <CrearJuegoPreguntas
                                key={i} id={i}
                                onClick={(e) => this.cambiarPregunta(i, e)} {...pregunta}/>)}
                        </div>
                        <div>
                            <button className="mt-10 btn-regular"
                                    onClick={this.crearPregunta}>Nueva
                            </button>
                        </div>
                    </div>
                    <CrearPreguntas
                        cambiarTitulo={this.cambiarTitulo}
                        cambiarPregunta={this.cambiarPregunta}
                        cambiarPuntaje={this.cambiarPuntaje}
                        cambiarSegundos={this.cambiarSegundos}
                        configurarRespuesta={this.configurarRespuesta}

                        {...this.state.preguntas[this.state.preguntaSeleccionada]}/>
                </div>
                <div className="flex justify-content-end mt-20">
                    <Button className="item" size="regular" value="Publicar"/>
                </div>
                {this.state.configurarRespuesta === null ? '' : <ConfigurarRespuesta/>}
            </div>
        )
    }
}

export default CrearJuego