import React, {useEffect, useState} from 'react'
import ProfileUserInfo from '../Components/ProfileUserInfo.js'
import ProfileUserStats from '../Components/ProfileUserStats.js'
import Button from '../Components/Button'
import '../Css/Profile.css'
import QuizMasterService from '../Libraries/QuizMasterServices';
import {useUsuario} from "../Libraries/UserContextLib";

export default function Profile() {
    const usuario = useUsuario();
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        //let data = QuizMasterService.obtenerJuegosDeUsuario();
    }, []);

    function render() {
        return (
            <div class="profile">
                <div class="usernameSection">
                    <img className="profile-img" src="img/perfil.png"/>
                    <h1>{usuario.usuario}</h1>
                    <Button class="item" to="/crear" value="Crear quiz nueva" size="regular"/>
                </div>
                <ProfileUserInfo/>
                <ProfileUserStats juegos={juegos}/>
            </div>
        )
    }

    return render();
}