import React from "react";
import ProfileUserInfo from "../Components/ProfileUserInfo.js";
import ProfileUserStats from "../Components/ProfileUserStats.js";
import Button from "../Components/Button";

import "../App.css";

class Profile extends React.Component {
  render() {
    return (
      <div class="profile">
        <div class="usernameSection">
          <img class="profile-img" src="img/perfil.png" />
          <h1>elcomix97</h1>
          <Button
            class="item"
            to="/crear"
            value="Crear quiz nueva"
            size="regular"
          />
        </div>
        <ProfileUserInfo />
        <ProfileUserStats />
      </div>
    );
  }
}

export default Profile;
