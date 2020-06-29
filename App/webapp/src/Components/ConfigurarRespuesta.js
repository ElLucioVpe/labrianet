import React, {useEffect, useState} from 'react'
import Button from "./Button";
import Input from "./Input";

class ConfigurarRespuesta extends React.Component {

    constructor(props) {
        super(props);
        this.handleCerrarModal = this.handleCerrarModal.bind(this);
        this.handleGuardarRespuesta = this.handleGuardarRespuesta.bind(this);
        this.handleChangeRespuesta = this.handleChangeRespuesta.bind(this);
        this.handleGuardarRespuestaCorrecta = this.handleGuardarRespuestaCorrecta.bind(this);

        this.state = {
            respuesta: this.props.respuesta,
            esCorrecta: this.props.esCorrecta
        };
    }

    handleCerrarModal() {
        this.props.cerrarModal();
    }

    handleGuardarRespuesta() {
        this.props.cambiarRespuesta(this.state.respuesta);
    }

    handleGuardarRespuestaCorrecta(e) {
        this.setState({esCorrecta: e.target.checked});
        this.props.cambiarRespuestaCorrecta(this.state.respuesta);
    }

    handleChangeRespuesta(e) {
        this.setState({respuesta: e.target.value});
    }

    render() {
        return (
            <div className="modal configurarRespuesta flex flex-direction-column">
                <div className="flex flex-direction-row justify-content-space-between w-100">
                    <div>
                        <Input size="regular" placeholder="Respuesta" value={this.state.respuesta || ''}
                               onChange={this.handleChangeRespuesta}/>
                        <Button size="regular" classList="ml-10" value="Guardar" onClick={this.handleGuardarRespuesta}/>
                    </div>
                    <Button size="regular" value="Cerrar" status="alert" onClick={this.handleCerrarModal}/>
                </div>
                <div className="mt-20">
                    <input type="checkbox" name="esCorrecta" id="iptRespuestaCorrecta"
                           defaultChecked={this.state.esCorrecta}
                           onChange={this.handleGuardarRespuestaCorrecta}/>
                    <label htmlFor="iptRespuestaCorrecta"> Esta es la respuesta correcta</label>
                </div>
            </div>
        )
    }
}

export default ConfigurarRespuesta