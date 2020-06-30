import React, {useState, useEffect, useMemo} from "react";
import Axios from 'axios';
import Cookies from 'js-cookie'

const UserContext = React.createContext(null);
const BASE_URL = "http://localhost:44353";

let config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export function UsuarioProvider(props) {
    const [usuario, setUsuario] = useState("");
    const [nickname, setNickname] = useState("");
    const [fechaUser, setFechaUser] = useState("");

    const [accessToken, setAccessToken] = useState("");
    const [tokenType, setTokenType] = useState("");
    const [tokenExpiration, setTokenExpiration] = useState("");

    const [inicioSesion, setInicioSesion] = useState(false);
    const [cargandoUsuario, setCargandoUsuario] = useState(false);

    useEffect(() => {
        async function cargarUsuario() {
            console.log("WIP");
            return;
        }
    });

    useEffect(() => {
        async function doIt() {
            if (Cookies.get('username') != null && Cookies.get('username') !== "") {
                if (Cookies.get('accessToken') != null) {
                    await setUsuario(Cookies.get('username'));
                    await setAccessToken(Cookies.get('accessToken'));
                    await setInicioSesion(true);
                    await getUserData(Cookies.get('username'), Cookies.get('accessToken'));
                }
            }
        };
        doIt();
    }, []);

    async function getUserData(user, token) {
        Axios.get(BASE_URL + '/api/User/GetUser',
            {
                params: {
                    id: user
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function (response) {
            setNickname(response.data.nickUser);
            setFechaUser(response.data.fechaUser);
            return true;
        }).catch(function (error) {
            // handle error
            return false;
        });
    }

    async function login(user, password) {
        let body = 'grant_type=password&username=' + user + '&password=' + password;
        await Axios.post(BASE_URL + '/token', body).then(function (response) {

            setUsuario(user);
            setAccessToken(response.data.access_token);
            setTokenType(response.data.token_type);
            setTokenExpiration(response.data.expires_in);

            Cookies.set('username', usuario);
            Cookies.set('accessToken', response.data.access_token);

            setInicioSesion(true);

            return !!getUserData();
        }).catch(function (error) {
            console.log(error);
            return false;
        });
    }

    async function signUp(loginname, nickuser, password, fecha) {
        Axios.post('http://localhost:44353/api/User/CreateUser', {
            loginnameUser: loginname,
            nickUser: nickuser,
            passwordUser: password,
            fechaUser: fecha
        }, config).then(function (response) {
            return !!login(loginname, password);
        }).catch(function (error) {
            // handle error
            console.log(error);
            return false;
        });
    }

    function logout() {
        setUsuario(null);
        setInicioSesion(false);
        Cookies.set('username', '');
        Cookies.set('accessToken', '');
    }

    const value = useMemo(() => {
        return ({
            usuario,
            setUsuario,
            nickname,
            setNickname,
            fechaUser,
            setFechaUser,
            cargandoUsuario,
            accessToken,
            setAccessToken,
            tokenType,
            setTokenType,
            tokenExpiration,
            setTokenExpiration,
            inicioSesion,
            signUp,
            login,
            logout
        })
    }, [usuario, cargandoUsuario, inicioSesion]);

    return <UserContext.Provider value={value} {...props}/>
}

export function useUsuario() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUsuario debe estar dentro el proveedor UserProvider');
    }
    return context;
}
