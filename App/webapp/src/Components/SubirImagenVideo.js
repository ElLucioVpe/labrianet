import React, {useEffect, useRef, useState} from 'react'
import Button from "./Button";
import Input from "./Input";

export default function SubirImagenVideo(props) {
    const inputFile = useRef(null);
    const [urlYouTube, setUrlYouTube] = useState(null);

    const handleCerrarModal = (() => {
        props.cerrarModal();
    });

    const handleYouTubeChange = ((event) => {
        setUrlYouTube(event.target.value);
    });

    const cambiarYouTubeUrl = (() => {
        //setImagen(e.target.files[0]);
        props.cambiarYouTubeUrl(urlYouTube);
    });

    const onImageChange = ((e) => {
        //setImagen(e.target.files[0]);
        e.persist();
        props.cambiarImagen(e);
    });

    const handleImageUploadClick = ((e) => {
        //setImagen(e.target.files[0]);
        inputFile.current.click();
    });

    function render() {
        return (
            <div className="modal subirImagenVideo flex flex-direction-column">
                <div className="flex flex-direction-row justify-content-space-between w-100">
                    <div>
                        <Input size="regular" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                               onChange={handleYouTubeChange}/>
                        <Button size="regular" classList="ml-10" value="Guardar" onClick={cambiarYouTubeUrl}/>
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <div>
                        <Button size="regular" classList="ml-10" value="Subir imágen" onClick={handleImageUploadClick}/>
                    </div>
                    <Button size="regular" value="Cerrar" status="alert" onClick={handleCerrarModal}/>
                </div>
                <form className="display-none">
                    <input type="file" onChange={onImageChange} ref={inputFile}/>
                </form>
            </div>
        )
    }

    return render();
}