import React from 'react'
import Button from "./Button";
import DarkThemeSwitcher from "./DarkThemeSwitcher";
import {Link} from "react-router-dom";
import '../Css/Header.css'

export const Header = () => {
    let usuario = false;
    return (
        <header class="container">
            <div class="header">
                <div class="alignLeft">
                    <Link to="/" class="logo">
                        <img src="logo.svg" alt=""/>
                    </Link>
                    <Link to="/" class="logo">
                        <span>QuizMaster</span>
                    </Link>
                </div>
                <div class="alignRight">
                    <DarkThemeSwitcher/>
                    {
                        usuario ? (
                            <Button class="item" to="/login" value="Login" size="regular"/>
                        ) : (
                            <Button class="item" to="/logout" value="Logout" size="regular"/>
                        )
                    }

                </div>
            </div>
        </header>
    )
}

export default Header