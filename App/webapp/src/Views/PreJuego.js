import React, {useEffect, useState} from 'react'
import Button from '../Components/Button'
import '../Css/PreJuego.css'
import QuizMasterService from "../Libraries/QuizMasterServices";
import {useUsuario} from "../Libraries/UserContextLib";
import Input from "../Components/Input";

export default function PreJuego(props){
    const usuario = useUsuario();
    const [info_juego, setInfo_juego] = useState([]);
    const [nickname, setNickname] = useState("Anonimo");
    const [counter, setCounter] = useState(-1);
    const [counterPausa, setCounterPausa] = useState(true);
    const BASE_URL = "http://localhost:44353";

    const iniciarJuego = (() => {
        setCounterPausa(false);
    });

    const countdown = (async() => {
        if(!counterPausa && counter === -1) setCounter(5);
        if(counter === 0) {
            var url = "/Juego/:id/:nick".replace(':id', props.match.params.id);
            url = url.replace(':nick', nickname);
            window.location = url;
        }
    });

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    });

    useEffect(() => {
        async function cargarJuego() {
            await QuizMasterService.obtenerJuego(props.match.params.id).then(
                function (data) {
                    setInfo_juego(data);
                }
            ).catch(function (error) {
                //window.location = "/";
            });
        }
        cargarJuego()

    }, []);


    function render() {
        countdown();

        function handleChange (event) {
            console.log(event.target.value);
            setNickname(event.target.value);
        }

        return (
            <div className="preJuego card">
                <div>
                    <h1>QuizMaster ({usuario.inicioSesion ? usuario.nickname : "Anonimo"})</h1>
                </div>

                {counterPausa ? (
                    <div>
                        <div className="preJuego-infoGame">
                            <div id="preJuego-info" className="preJuego-info info">
                                <h1>{info_juego.tituloJuego}</h1>
                                <h5>{info_juego.descripcionJuego}</h5>
                            </div>
                            <div id="preJuego-cover" className="preJuego-info cover">
                                {info_juego.coverJuego ? (
                                    <img src={"../../public/img/"+info_juego.coverJuego} height={200} width={300}/>
                                ) : (
                                    <img src={"../../public/img/gamecover.png"} height={200}/>
                                )}
                            </div>
                        </div>
                        <div id="preJuego-nickname" className="preJuego-nickname">
                            <label for="input-nick">Nickname:</label>
                            <Input id="input-nick" type="text" onChange={ handleChange }/>
                        </div>
                        <div id="preJuego-btn">
                            <button className="preJuego-btn" onClick={() => iniciarJuego()} value="Iniciar">Iniciar</button>
                        </div>
                    </div>
                ) : (
                    <h1>{counter}</h1>
                )}


            </div>
        );


    }
    return render();
}