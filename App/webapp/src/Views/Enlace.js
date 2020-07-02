import React from 'react'
import Button from "../Components/Button";
import {TwitterShareButton} from 'react-twitter-embed';

import "../Css/Enlace.css";

export default function Enlace(props) {
    function sendToClipboard() {
        var copyText = document.getElementById("game-url");

        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");
    }

    function render() {
        return (
            <div class="menu2 container card">
                {!(props.id === undefined ||props.id === -1 || props.id === false) ? (
                    <div className="text-align-center">
                        <h1>¡Tu juego ya está publicado!</h1>
                        <span>Invita a tus amigos a jugarlo</span>
                        <img src="/views/crear/friends.svg" className="mt-20"/>
                    </div>
                ):(
                    <div className="text-align-center">
                        <h1>Ha ocurrido un error</h1>
                        <span>Asegurese de que ingreso todos los datos correctamente</span>
                        <div>
                            <img src="/views/crear/cross.svg" className="mt-20" width="50%" height="50%"/>
                        </div>
                    </div>
                )}
                <div className="LinkInput w-50 mt-20 relative">
                    <input id="game-url" className="input-big mr-10" placeholder="Titulo" readOnly={true}
                           value={"http://localhost/juego/" + props.id}/>
                    <div className="copy-svg flex justify-content-center absolute" onClick={sendToClipboard}>
                        <img
                            src="/views/crear/copy.svg"/>
                    </div>
                </div>
                <div>
                    <TwitterShareButton
                        url={"http://localhost/juego/" + props.id}
                        options={{
                            text: 'Acabo de hacer una nueva quiz en #quizmaster! Juegala aquí:',
                            via: 'lucius1997'
                        }}
                    />
                </div>
                <div className="mt-20">
                    <Button classList="item mr-10" size="regular" value="Volver a Inicio" to="/"/>
                    <Button classList="item" size="regular" status="confirm" value="Jugar!"
                            to={"/juego/" + props.id}/>
                </div>
            </div>
        )

    }

    return render();
}
