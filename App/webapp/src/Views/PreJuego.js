import React from 'react'
import Button from '../Components/Button'
import '../Css/PreJuego.css'

export default function PreJuego(){
    function render() {
        return (
            <div className="preJuego">
                <div>
                    <h1>QuizMaster (PlayerName)</h1>
                </div>

                <div className="infoGame">

                        <div>
                            NameQuiz
                        </div>
                        <div>
                            DescQuiz
                        </div>


                    <div>GameCover</div>
                </div>

                <div>
                    <form>
                        <input type="text" name="name" placeholder="Nickname"/>

                        <input type="submit" className="btn-regular" value="Iniciar"/>
                    </form>
                </div>


            </div>
        );

        return render();
    }
}