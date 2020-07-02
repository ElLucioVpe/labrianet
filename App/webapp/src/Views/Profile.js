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

    const desactivarJuego = (async (id) => {
        await QuizMasterService.updateJuego(id, {
            "activadoJuego": 0
        });
    });

    useEffect(() => {
        doIt();

        async function doIt() {
            if (usuario.usuario != null) {
                let data = await QuizMasterService.obtenerJuegosDeUsuario({
                    usuario: usuario.usuario
                });
                console.log(data);
                setJuegos(data);
                console.log(usuario.usuario);
                let statsJuegosUsuario = await QuizMasterServices.obtenerJugadoresUsuario({loginname: usuario.usuario});
                setStats(statsJuegosUsuario);
            }
        }
    }, [usuario.usuario]);

    function render() {
        return (
            <div class="profile">
                <div class="usernameSection">
                    <img className="profile-img" src="img/perfil.png"/>
                    <h1>{usuario.usuario}</h1>
                    <Button class="item" to="/crear" value="Crear quiz nueva" size="regular"/>
                </div>
                <ProfileUserInfo juegos={juegos} stats={stats}/>
                <ProfileUserStats juegos={juegos} desactivarJuego={desactivarJuego}/>
            </div>
        )
    }

    return render();
}