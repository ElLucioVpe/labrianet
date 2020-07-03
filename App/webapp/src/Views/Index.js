import React, {useLayoutEffect, useState} from 'react'
import Button from '../Components/Button'
import '../Css/Index.css'

export default function Index() {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    function render() {
        return (
            <div class="index">
                <div className="main_introduction flex flex-direction-column">
                    <div className="grid grid-main-introduction">
                        <div className="mundo flex justify-content-center align-self-self-start">
                            <img className="display-none" src="/views/index/brillar.svg" alt=""/>
                        </div>
                        <div className="astronauta flex justify-content-center">
                            <img src="/views/index/astronauta.svg" alt=""/>
                        </div>
                        <div className="mundo flex flex-direction-column align-self-self-end">
                            <img className="rotate-45" src="/views/index/viaje.svg" alt=""/>
                        </div>
                        <div className="mundo flex flex-direction-column justify-self-end">
                            <img src="/views/index/globo.svg" alt=""/>
                        </div>
                    </div>
                    <p>Crea tus propias trivias y compartela con tus amigos de la forma más fácil y divertida!</p>
                </div>
                <div class={"main_menu " + (!isMobile || "mb-20")}>
                    <img class="item" src="logo.svg"/><h1>QuizMaster</h1>
                    <Button class="item" to="/jugar" value="Jugar" size="large"/>
                    <Button class="item" to="/crear" value="Crear" size="large"/>
                </div>
            </div>
        )
    }

    return render();
}