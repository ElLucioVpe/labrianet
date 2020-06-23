import React, {useEffect, useState} from 'react'
import ProfileUserInfo from '../Components/ProfileUserInfo.js'
import ProfileUserStats from '../Components/ProfileUserStats.js'
import Button from '../Components/Button'
import '../Css/Profile.css'
import QuizMasterService from '../Libraries/QuizMasterServices';

export default function Profile() {
    const [nickUser, setNickUser] = useState("xdxd");

    useEffect(() => {
        //let data = QuizMasterService.obtenerProfile();
        setNickUser("xdxdxd");
    }, []);

    function render() {
        return (
            <div class="profile">
                <div class="usernameSection">
                    <img className="profile-img" src="img/perfil.png"/>
                    <h1>{nickUser}</h1>
                    <Button class="item" to="/crear" value="Crear quiz nueva" size="regular"/>
                </div>
                <ProfileUserInfo/>
                <ProfileUserStats/>
            </div>
        )
    }

    return render();
}