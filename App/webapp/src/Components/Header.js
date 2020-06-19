import React, {useEffect, useState} from 'react'
import Button from "./Button";
import DarkThemeSwitcher from "./DarkThemeSwitcher";
import {Link} from "react-router-dom";
import {useUsuario} from "../Libraries/UserContextLib";
import '../Css/Header.css'

export const Header = () => {
    const usuario = useUsuario();

    return (
        <header className="container">
            <div className="header">
                <div className="alignLeft">
                    <Link to="/" className="logo">
                        <img src="logo.svg" alt=""/>
                    </Link>
                    <Link to="/" className="logo">
                        <span>QuizMaster</span>
                    </Link>
                </div>
                <div className="alignRight">
                    <DarkThemeSwitcher/>
                    {
                        usuario.inicioSesion ? (
                            <Button className="item" to="/logout" value="Logout" size="regular"/>
                        ) : (
                            <Button className="item" to="/login" value="Login" size="regular"/>
                        )
                    }

                </div>
            </div>
        </header>
    )
}

export default Header