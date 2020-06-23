import React from 'react'
import ProfileUserInfo from '../Components/ProfileUserInfo.js'
import ProfileUserStats from '../Components/ProfileUserStats.js'
import Button from '../Components/Button'
import '../Css/Profile.css'
import QuizMasterService from '../Libraries/QuizMasterServices';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                nickUser: "xdxd"
            }
        }
    }

    componentDidMount() {
        let data = QuizMasterService.getProfile();
        this.setState({"data.nickUser": "xdxdxd"});
    }

    render() {
        const {data} = this.state.data;

        return (
            <div class="profile">
                <div class="usernameSection">
                    <img class="profile-img" src="img/perfil.png"/>
                    <h1>{this.state.data.nickUser}</h1>
                    <Button class="item" to="/crear" value="Crear quiz nueva" size="regular"/>
                </div>
                <ProfileUserInfo/>
                <ProfileUserStats/>
            </div>
        )
    }
}

export default Profile