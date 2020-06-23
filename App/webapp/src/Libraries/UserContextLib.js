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
        if (Cookies.get('usuario') !== null || Cookies.get('usuario') !== "") {
            setUsuario(Cookies.get('usuario'));
            setAccessToken(Cookies.get('accessToken'));
            getUserData();
        }
    });

    async function getUserData() {
        if (usuario !== null && usuario !== "") {
            Axios.get(BASE_URL + '/api/User/GetUser',
                {
                    params: {
                        id: usuario
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
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
        } else {
            return false;
        }
    }

    async function login(user, password) {
        let body = 'grant_type=password&username=' + user + '&password=' + password;
        await Axios.post(BASE_URL + '/token', body).then(function (response) {

            setUsuario(user);
            setAccessToken(response.data.access_token);
            setTokenType(response.data.token_type);
            setTokenExpiration(response.data.expires_in);

            Cookies.set('username', usuario);
            Cookies.set('accessToken', accessToken);

            setInicioSesion(true);

            return !!getUserData();
        }).catch(function (error) {
            // handle error
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
        console.log("usuario eliminado");
        //deleteToken();
        process.env.API_TOKEN = '';
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
