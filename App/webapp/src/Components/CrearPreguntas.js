import React, {useEffect, useRef, useState} from 'react'
import Button from "../Components/Button";
import ReactPlayer from "react-player";

export function CrearPreguntas(props) {
    const inputFile = useRef(null);
    const [imagen, setImagen] = useState(null);

    const handleClickImage = (() => {
        inputFile.current.click();
    });

    const handleSubirContenido = ((e) => {
        props.abrirSubirImagenVideo(e.target.value);
    });

    const handleChangeSegundos = ((e) => {
        props.cambiarSegundos(e.target.value);
    });

    const handleChangeTitulo = ((e) => {
        props.cambiarTitulo(e.target.value);
    });

    const handleChangePuntaje = ((e) => {
        props.cambiarPuntaje(e.target.value);
    });

    const handleConfigurarRespuesta = ((e, id) => {
        props.configurarRespuesta(id);
    });

    const handleChangeStartAyuda = ((e) => {
        props.cambiarStartAyuda(e.target.value);
    });

    const handleChangeEndAyuda = ((e) => {
        props.cambiarEndAyuda(e.target.value);
    });

    const onImageSubmit = ((e) => {
        e.preventDefault(); // Stop form submit
        fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    });

    const onImageChange = ((e) => {
        setImagen(e.target.files[0]);
        props.subirImagen(e);
        //this.onImageSubmit()
    });

    const esVideo = (() => {
        if (props.imgUrl != null) {
            if (props.imgUrl.slice(0, 8) === "https://") {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    const fileUpload = ((file) => {
        const url = 'http://example.com/file-upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        //return post(url, formData, config)
    });

    function render(props) {
        return (
            <div className="pregunta card">
                <div className="flex justify-content-center">
                    <input placeholder="Pregunta" className="w-80 input-regular" value={props.titulo || ''}
                           onChange={handleChangeTitulo}/>
                </div>
                <div className="flex justify-content-center mt-10">
                    <div className="flex flex-direction-column justify-content-center w-20 p-10">
                        <input placeholder="20s" className="w-80 input-regular mt-10" value={props.segundos || ''}
                               onChange={handleChangeSegundos}/>
                        <input placeholder="1000 pts" className="w-80 input-regular  mt-10"
                               value={props.puntaje || ''} onChange={handleChangePuntaje}/>
                        {esVideo() &&
                        <input placeholder="00:00" className="w-80 input-regular" value={props.startAyuda}
                               onChange={handleChangeStartAyuda}/>
                        }
                        {esVideo() &&
                        <input placeholder="00:20" className="w-80 input-regular" value={props.endAyuda}
                               onChange={handleChangeEndAyuda}/>
                        }

                    </div>
                    <div className="flex w-80 justify-content-center">
                        <div className="relative width-inherit" onClick={((e) => handleSubirContenido(e))}>
                            {
                                esVideo() ? <ReactPlayer
                                    url={props.imgUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                                /> : <img className="pregunta_foto"
                                          src={props.imgUrl || 'img/gamecover.png'}/>
                            }
                            <div className="absolute imgUpload">
                                <img className="editImg"
                                     src="/views/crear/upload.svg" onClick={((e) => handleSubirContenido(e))}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-2-2 mt-20">
                    <Button classList="item justify-self-end"
                            value={props.respuestas[0] != null ? props.respuestas[0] : 'Respuesta 1'}
                            size="regular"
                            onClick={((e) => handleConfigurarRespuesta(e, 0))}/>
                    <Button classList="item justify-self-start"
                            value={props.respuestas[1] != null ? props.respuestas[1] : 'Respuesta 2'} size="regular"
                            onClick={((e) => handleConfigurarRespuesta(e, 1))}/>
                    <Button classList="item justify-self-end"
                            value={props.respuestas[2] != null ? props.respuestas[2] : 'Respuesta 3'}
                            size="regular"
                            onClick={((e) => handleConfigurarRespuesta(e, 2))}/>
                    <Button classList="item justify-self-start"
                            value={props.respuestas[3] != null ? props.respuestas[3] : 'Respuesta 4'}
                            size="regular"
                            onClick={((e) => handleConfigurarRespuesta(e, 3))}/>
                </div>
            </div>
        )
    }

    return render(props);
}

export default CrearPreguntas