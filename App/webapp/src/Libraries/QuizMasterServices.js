import Axios from 'axios';
import {useUsuario} from "../Libraries/UserContextLib";

const BASE_URL = "http://localhost:44353"

let config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
};

const QuizMasterServices = {
    crearJuego: function (props) {
        Axios.post(BASE_URL + '/api/Juego/CreateJuego',
            props,
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + props.accessToken
            }
        ).then(function (response) {
            return response;
        }).catch(function (error) {
            // handle error
            console.log(error);
            return false;
        });
    },
    crearPregunta: function (props) {
        Axios.post(BASE_URL + '/api/User/crearPregunta',
            {
                params: {
                    idPregunta: props.idJuego,
                    Juego_idJuego: props.Juego_idJuego,
                    segundosPregunta: props.segundosPregunta,
                    puntosPregunta: props.puntosPregunta,
                    contenidoPregunta: props.contenidoPregunta,
                    tipoPregunta: props.tipoPregunta,
                    urlAyudaPregunta: props.urlAyudaPregunta,
                    startAyuda: props.startAyuda,
                    endAyuda: props.endAyuda,
                    respuestas: [
                        {
                            idRespuesta: props.respuestas.idRespuesta,
                            Pregunta_idPregunta: props.respuestas.Pregunta_idPregunta,
                            esCorrectoRespuesta: props.respuestas.esCorrectoRespuesta,
                            contenidoRespuesta: props.respuestas.contenidoRespuesta,
                        },
                        {
                            idRespuesta: props.respuestas.idRespuesta,
                            Pregunta_idPregunta: props.respuestas.Pregunta_idPregunta,
                            esCorrectoRespuesta: props.respuestas.esCorrectoRespuesta,
                            contenidoRespuesta: props.respuestas.contenidoRespuesta,
                        },
                    ]
                },
                config
            }
        ).then(function (response) {
            return true;
        }).catch(function (error) {
            // handle error
            return false;
        });
    },
    obtenerJuegos: function (props) {
        return Axios.get('http://localhost:44353/api/Juego/GetAll/',
        {
            headers: {
                'Authorization': 'Token ' + process.env.API_TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        });
    },
 
    obtenerJuego: function (props) {
        return Axios.get('http://localhost:44353/api/Juego/GetJuego/' + props.id,
        {
            headers: {
                'Authorization': 'Token ' + process.env.API_TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        });
    },
    obtenerJuegosDeUsuario: function (props) {
        const {data} = Axios.get('http://localhost:44353/api/Juego/GetJuego/'
            + props.id, {
            headers: {
                'Authorization': 'Token ' + process.env.API_TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },  
     obtenerRespuestaStats: function (props) {
        return Axios.get('http://localhost:44353/api/Pregunta/GetStatsRespuestas/'+ props.id).then(response => {
            return response.data;})
    },
    obtenerRanking: function (props){
        return Axios.get('http://localhost:44353/api/Juego/GetRanking/'+ props.id).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        }) 
         
    },
    obtenerProfile: function (props) {
        const {data} = Axios.get('http://localhost:44353/api/Juego/GetJuego/'
            + props.id, {
            headers: {
                'Authorization': 'Token ' + process.env.API_TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    obtenerListadoMusica: function () {
        return Axios.get('http://localhost:44353/api/Musica/GetAll').then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        })
    }
}

export default QuizMasterServices;