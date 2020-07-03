import React, {useEffect, useLayoutEffect, useState} from 'react'
import Button from '../Components/Button'
import '../Css/PreJuego.css'
import QuizMasterService from "../Libraries/QuizMasterServices";
import {useUsuario} from "../Libraries/UserContextLib";
import Input from "../Components/Input";

export default function PreJuego(props) {
    const usuario = useUsuario();
    const [info_juego, setInfo_juego] = useState([]);
    const [nickname, setNickname] = useState("Anonimo");
    const [password, setPassword] = useState("");
    const [counter, setCounter] = useState(-1);
    const [counterPausa, setCounterPausa] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const BASE_URL = "http://localhost:44353";

    const iniciarJuego = (() => {
        if (info_juego.password) {
            if (password === info_juego.password) {
                setCounterPausa(false);
            } else {
                alert("Contraseña Incorrecta");
            }
        } else {
            setCounterPausa(false);
        }
    });

    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const countdown = (async () => {
        if (!counterPausa && counter === -1) setCounter(5);
        if (counter === 0) {
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
            await QuizMasterService.obtenerJuego({id: props.match.params.id}).then(
                function (data) {
                    setInfo_juego(data);
                }
            ).catch(function (error) {
                window.location = "/";
            });
        }

        cargarJuego()

    }, []);


    function render() {
        countdown();

        function handleChange(event) {
            console.log(event.target.value);
            setNickname(event.target.value);
        }

        function handleChangePassword(event) {
            console.log(event.target.value);
            setPassword(event.target.value);
        }

        return (
            <div className="preJuego card">
                <div>
                    <h1>QuizMaster ({usuario.inicioSesion ? usuario.nickname : "Anonimo"})</h1>
                </div>

                {counterPausa ? (
                    <div>
                        <div className={"preJuego-infoGame " + (!isMobile || "flex flex-direction-column")}>
                            <div id="preJuego-info" className="preJuego-info info">
                                <h1>{info_juego.tituloJuego}</h1>
                                <h5>{info_juego.descripcionJuego}</h5>
                            </div>
                            <div id="preJuego-cover" className="preJuego-info cover">
                                {info_juego.coverJuego ? (
                                    <img src={QuizMasterService.getUrlImagen("cover", info_juego.coverJuego)}
                                         height={200} width={300}/>
                                ) : (
                                    <img src={"img/gamecover.png"} height={200}/>
                                )}
                            </div>
                        </div>
                        <div id="preJuego-nickname" className="preJuego-nickname">
                            <label for="input-nick">Nickname:</label>
                            <Input id="input-nick" type="text" onChange={handleChange}/>
                        </div>
                        {info_juego.password &&
                        <div id="preJuego-password" className="preJuego-nickname">
                            <label htmlFor="input-password">Password:</label>
                            <Input id="input-password" type="password" onChange={handleChangePassword}/>
                        </div>
                        }
                        <div id="preJuego-btn">
                            <button className="preJuego-btn" onClick={() => iniciarJuego()} value="Iniciar">Iniciar
                            </button>
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