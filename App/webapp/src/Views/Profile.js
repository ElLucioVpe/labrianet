import React, {useEffect, useState} from 'react'
import ProfileUserInfo from '../Components/ProfileUserInfo.js'
import ProfileUserStats from '../Components/ProfileUserStats.js'
import Button from '../Components/Button'
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useUsuario} from "../Libraries/UserContextLib";

import '../Css/Profile.css'
import QuizMasterServices from "../Libraries/QuizMasterServices";

export default function Profile() {
    const usuario = useUsuario();
    const [juegos, setJuegos] = useState([]);
    const [stats, setStats] = useState([]);
    const [jugados, setJugados] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const desactivarJuego = (async (accion, pos) => {
        var game = juegos[pos];
        if(accion === "Desactivar") game.activadoJuego = 0;
        else game.activadoJuego = 1;
        //console.log(game);
        await QuizMasterService.updateJuego({
            juego: game,
            accessToken: usuario.accessToken
        }).then(() => {
            setActualizar(!actualizar);
        });
    });

    useEffect(() => {
        doIt();

        async function doIt() {
            if (usuario.usuario != null) {
                let data = await QuizMasterService.obtenerJuegosDeUsuario({
                    usuario: usuario.usuario, accessToken: usuario.accessToken
                });
                setJuegos(data);

                let statsJuegosUsuario = await QuizMasterServices.obtenerJugadoresUsuario({loginname: usuario.usuario});
                setStats(statsJuegosUsuario);

                let data_jugados = await QuizMasterServices.obtenerArrayJugados({loginname: usuario.usuario});
                setJugados(data_jugados);
            }
        }
    }, [usuario.usuario, actualizar]);


    function render() {
        return (
            <div class="profile">
                <div class="usernameSection">
                    <img className="profile-img" src="img/perfil.png"/>
                    <h1>{usuario.usuario}</h1>
                    <Button class="item" to="/crear" value="Crear quiz nueva" size="regular"/>
                </div>
                <ProfileUserInfo juegos={juegos} stats={stats}/>
                <ProfileUserStats juegos={juegos} jugados={jugados} desactivarJuego={desactivarJuego}/>
            </div>
        )
    }

    return render();
}