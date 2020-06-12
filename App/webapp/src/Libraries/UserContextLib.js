import React, {useState, useEffect, useMemo} from "react";
import {setToken, deleteToken, getToken} from '../Libraries/AuthHelpers';
import Axios from 'axios';

const UserContext = React.createContext(null);
const BASE_URL = "http://localhost:44353"

export function UsuarioProvider(props) {
    const [usuario, setUsuario] = useState(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(false);

    useEffect(() => {
        async function cargarUsuario() {
            console.log("WIP");
            return;
        }
    });

    async function login(user, password) {
        let body = 'grant_type=password&username=' + user + '&password=' + password;
        const {data} = await Axios.post(BASE_URL + '/token', body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        setUsuario(data.usuario);
        setToken(data.token);
    }

    async function signup(usuario) {
        const {data} = await Axios.post('/somethingidk', {
            //usuario                 //aca mandar las variables
        });
        setUsuario(data.usuario);
        setToken(data.token);
    }

    function logout() {
        setUsuario(null);
        deleteToken();
    }

    const value = useMemo(() => {
        return ({
            usuario,
            cargandoUsuario,
            signup,
            login,
            logout
        })
    }, [usuario, cargandoUsuario])

    return <UserContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUsuario debe estar dentro el proveedor UserProvider');
    }
    return context;
}
