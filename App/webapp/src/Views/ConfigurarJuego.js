import React from 'react'
import CheckBox from "../Components/CheckBox";
import Input from '../Components/Input'
import Button from '../Components/Button'

import "../Css/ConfigurarJuego.css";

class ConfigurarJuego extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            privacidad: [
                {id: 1, value: "Público", isChecked: false},
                {id: 2, value: "Privado", isChecked: false}
            ]
        }
    }

    handleCheckChieldElement = (event) => {
        let privacidad = this.state.privacidad
        privacidad.forEach(item => {
            if (item.value === event.target.value)
                item.isChecked = event.target.checked
            else item.isChecked = false;
        })
        this.setState({privacidad: privacidad})
    }

    render() {
        return (
            <div className="configuracionJuego container">
                <form>
                    <h2>Game Summary</h2>
                    <div className="grid-configuracionJuego">
                        <div className="seccion1-config card">
                            <p>
                                <input className="input" type="text" name="titulo" placeholder="Titulo"/>
                            </p>

                            <Input className="descripcion-juego" placeholder="Descripción" type="textarea" rows="10"
                                   cols="50">
                            </Input><br/>

                            <ul>
                                {
                                    this.state.privacidad.map((item) => {
                                        return (<CheckBox
                                            handleCheckChieldElement={this.handleCheckChieldElement} {...item} />)
                                    })
                                }
                            </ul>
                            <p><input className="input" type="text" name="password" placeholder="Password"/></p>

                        </div>

                        <div className="seccion2-config card">
                            <img id="gamecover" width="450" height="300" src="../../img/gamecover.png"
                                 placeholder="GameCover"/>
                            <br/>
                            <select id="musica-juego">
                                <option selected>Musica del juego</option>
                                <option value="cancion1">Cancion1</option>
                                <option value="cancion2">Cancion2</option>
                            </select>

                        </div>
                    </div>

                    <div className="configuracionJuego-submit mt-20">
                        <input type="submit" className="btn-regular" value="OK"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default ConfigurarJuego