import React, {useEffect, useState} from "react";
import {useUsuario} from "../Libraries/UserContextLib";
import {Redirect} from 'react-router';

export default function Logout() {
    const usuario = useUsuario();
    usuario.logout();

    function render() {
        return (
            <Redirect to="/"/>
        )
    }

    return render();
}