import React from 'react'
import Button from "../Components/Button";
import Input from '../Components/Input';
//import CrearJuegoPreguntas from "../Views/CrearJuegoPreguntas";
//import '../Css/CrearJuegoPreguntas.css'

class CrearPreguntas extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeTitulo = this.handleChangeTitulo.bind(this);
        this.handleChangeSegundos = this.handleChangeSegundos.bind(this);
        this.handleChangePuntaje = this.handleChangePuntaje.bind(this);
        this.handleConfigurarRespuesta = this.handleConfigurarRespuesta.bind(this);

    }

    handleChangeSegundos(e) {
        this.props.cambiarSegundos(e.target.value);
    }

    handleChangeTitulo(e) {
        this.props.cambiarTitulo(e.target.value);
    }

    handleChangePuntaje(e) {
        this.props.cambiarPuntaje(e.target.value);
    }

    handleConfigurarRespuesta(e) {
        this.props.configurarRespuesta(1);
    }

    render() {
        return (
            <div className="pregunta card">
                <div className="flex justify-content-center">
                    <input placeholder="Pregunta" className="w-80 input-regular" value={this.props.titulo || ''}
                           onChange={this.handleChangeTitulo}/>
                </div>
                <div className="flex justify-content-center mt-10">
                    <div className="flex flex-direction-column justify-content-center w-20">
                        <Input placeholder="20s" size="regular" value={this.props.segundos || ''}
                               onChange={this.handleChangeSegundos}/>
                        <Input placeholder="1000 pts" size="regular" classList="mt-10"
                               value={this.props.puntaje || ''} onChange={this.handleChangePuntaje}/>
                    </div>
                    <div className="flex w-80 justify-content-center">
                        <img className="pregunta_foto" src={this.props.imgUrl || 'img/perfil.png'}/>
                    </div>
                </div>
                <div className="grid-2-2 mt-20">
                    <Button classList="item justify-self-end" value="Respuesta" size="regular"
                            onClick={this.handleConfigurarRespuesta}/>
                    <Button classList="item justify-self-start" value="Respuesta" size="regular"
                            onClick={this.handleConfigurarRespuesta}/>
                    <Button classList="item justify-self-end" value="Respuesta" size="regular"
                            onClick={this.handleConfigurarRespuesta}/>
                    <Button classList="item justify-self-start" value="Respuesta" size="regular"
                            onClick={this.handleConfigurarRespuesta}/>
                </div>
            </div>
        )
    }
}

export default CrearPreguntas