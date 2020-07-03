import React from 'react'
import Button from "./Button";

class CrearJuegoPreguntas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activo: false,
            imgUrl: ""
        };

        this.eliminarPregunta = this.eliminarPregunta.bind(this);
    }

    clicked(e) {
        this.props.onClick(e, this.props.id);
        this.setState({activo: true});
    }

    eliminarPregunta() {
        this.props.eliminarPregunta(this.props.id);
    }

    render() {
        return (
            <div class={`crearJuegoPreguntas flex flex-direction-column ${this.props.className} relative`}>
                <div onClick={this.props.onClick} class="crearJuegoPreguntasContainer">
                    <div className="text-align-center">
                        <p>{this.props.titulo || ''}</p>
                    </div>
                    <div className="text-align-center PreguntaPreviewBox">
                        <img
                            src={this.props.imgUrl != null ? (this.props.imgUrl.slice(0, 8) === "https://" ? "http://img.youtube.com/vi/" + this.props.imgUrl.slice(32) + "/3.jpg" : this.props.imgUrl) : '/img/gamecover.png'}
                            className="PreguntaPreview "/>
                    </div>
                    <div className="flex flex-direction-row justify-content-space-between">
                        <p>{this.props.puntaje === null ? '0p' : this.props.puntaje + "p"}</p>
                        <p>{this.props.segundos === null ? "0s" : this.props.segundos + "s"}</p>
                    </div>
                </div>
                <div className={`absolute cerrarPregunta ${this.props.mostrarCerrar ? '' : 'display-none'}`}
                     onClick={this.eliminarPregunta}>
                    <img src="/views/crear/cross.svg" className=""/>
                </div>
            </div>
        )
    }
}

export default CrearJuegoPreguntas