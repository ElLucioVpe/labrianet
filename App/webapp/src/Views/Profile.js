import React from 'react'
import {
    Link
} from "react-router-dom";
import ProfileUserInfo from '../Components/ProfileUserInfo.js'
import ProfileUserStats from '../Components/ProfileUserStats.js'

import '../App.css';

class Profile extends React.Component {
    render() {
        return (
            <div class="profile">
                <div class="usernameSection">
                    <img class="profile-img" src="img/perfil.png"/>
                    <h1>Diego Olivera</h1>
                </div>
                <ProfileUserInfo/>
                <ProfileUserStats/>
            </div>
        )
    }
}

export default Profile