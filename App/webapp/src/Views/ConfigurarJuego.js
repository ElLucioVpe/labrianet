import React from 'react'
import Button from "../Components/Button";
import "./ConfigurarJuego.css";

class ConfigurarJuego extends React.Component {

    render() {
        return (
            <div className="configuracion">
                <form>
                    <h2>Game Summary</h2>
                    <div className="grid">
                        <div className="seccion1-config">
                            <p>
                                <input type="text" name="titulo" placeholder="Titulo" />
                            </p>
                            <textarea className="descripcion" placeholder="Descripción" rows="10" cols="50">
                            </textarea><br />

                            <label>
                                <input type="checkbox" onChange={this.PrivacidadOnChange} className="esPrivado" value="false" name="privacidad"/>Público</label>
                            <br />
                            <label>
                                <input type="checkbox" className="esPrivado" value="true" name="privacidad"/>Privado</label>
                            <p><input type="text" name="password" placeholder="Password"/></p>

                        </div>

                        <div className="seccion2-config">
                            <img id="gamecover" width="450" height="300" src="../../img/gamecover.png" placeholder="GameCover"/>
                            <br />
                            <select id="musica-juego">
                                <option selected>Musica del juego</option>
                                <option value="cancion1">Cancion1</option>
                                <option value="cancion2">Cancion2</option>
                            </select>

                        </div>
                    </div>
                    <input type="submit" className="btn-regular" value="OK"/>
                </form>
            </div>
        )
    }

    PrivacidadOnChange() {
        /*$("input:checkbox").on('click', function () {
            let $box = $(this);
            if ($box.is(":checked")) {
                let group = "input:checkbox[name='" + $box.attr("name") + "']";
                $(group).prop("checked", false);
                $box.prop("checked", true);
            } else {
                $box.prop("checked", false);
            }
        });*/
    }
}

export default ConfigurarJuego