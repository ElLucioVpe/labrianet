import React, {useEffect, useState, useLayoutEffect} from 'react'
import Button from "../Components/Button";
import Input from '../Components/Input'
import QuizPreview from '../Components/QuizPreview'
import QuizMasterService from '../Libraries/QuizMasterServices';

import "../Css/Jugar.css"
import CrearJuegoPreguntas from "../Components/CrearJuegoPreguntas";

export default function Jugar() {
    const [juegos, set_juegos] = useState([{}]);
    const [busqueda, setbusqueda] = useState([{}]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        async function doIt() {
            let data_juegos = await QuizMasterService.obtenerJuegos();
            await set_juegos(data_juegos);
        }

        doIt()
    }, []);

    const filtro = ((event) => {
        setbusqueda(event.target.value);
    });

    const handleEnlace = ((event) => {
        if (event.key === 'Enter') {
            let url = event.target.value;
            if (url.includes("/juego/")) window.location = url;
            else alert("El formato del enlace es incorrecto");
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

    useEffect(() => {
        async function doIt() {
            let data_juegos = await QuizMasterService.obtenerJuegos();
            await set_juegos(data_juegos);
        }

        let tmpArray = [];
        if (busqueda.length > 0) {
            juegos.forEach((item) => {
                //console.log(item.tituloJuego);
                if (item.tituloJuego != null) {
                    if (item.tituloJuego.indexOf(busqueda) !== -1) {
                        tmpArray.push(item);
                    }

                }
            });
        } else {
            doIt()
        }
        set_juegos(tmpArray)
    }, [busqueda]);

    function render() {
        return (
            <div className="Jugar container">
                <div
                    className={"join card flex align-items-center " + (isMobile ? "flex-direction-column" : "flex-direction-row")}>
                    <p>Si tienes un código para unirte a un juego, escríbelo aqui:</p>
                    <div className={"relative " + (isMobile ? "" : "ml-10")}>
                        <img className="invite-key" src="/views/jugar/key.webp" alt/>
                        <Input classList="invite-input" onKeyDown={handleEnlace} type="text"
                               placeholder="www.gamequiz.com/juego/1" size="big"/>
                    </div>
                </div>
                <div className="card mt-10">
                    <div className="filtro relative">
                        <img className="filter-search" src="/views/jugar/search.png" alt/>
                        <Input classList="filter-input" placeholder="Filtro" size="big" onChange={filtro}/>
                    </div>
                    <div
                        className={"listado overflow-overlay bg-white border-radius-25px flex mt-10 " + (isMobile ? "flex-direction-column" : "flex-direction-row")}>
                        {juegos.map((juego, i) => <QuizPreview isMobile={isMobile}
                                                               key={i} id={i} {...juego}/>)}
                    </div>
                </div>
            </div>
        )
    }

    return render();
}