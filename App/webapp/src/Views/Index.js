import React from 'react'
import Button from '../Components/Button'

class Index extends React.Component {
    render() {
        return (
            <div class="index">
                <div className="main_introduction">
                    <p>Crea tus propias trivias y compartela con tus amigos de la forma más fácil y divertida!</p>
                </div>
                <div class="main_menu">
                    <img class="item" src="logo.svg"/><h1>QuizMaster</h1>
                    <Button class="item" to="/jugar" value="Jugar" size="large"/>
                    <Button class="item" to="/crear" value="Crear" size="large"/>
                </div>
            </div>
        )
    }
}

export default Index