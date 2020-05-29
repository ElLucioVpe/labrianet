import React from 'react'
import Button from '../Components/Button'

class PreJuego extends React.Component {
    render() {
        return (
            <div className="preJuego">
                <div>
                    <h1>QuizMaster (PlayerName)</h1>
                </div>

                <div className="infoGame">
                    <div>
                        <div>
                            NameQuiz
                        </div>
                        <div>
                            DescQuiz
                        </div>
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
    }
}

export default PreJuego;