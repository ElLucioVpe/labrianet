import React from 'react'
import "../Css/QuizPreview.css"
import {
    Link
} from "react-router-dom";
import QuizMasterService from "../Libraries/QuizMasterServices";

class QuizPreview extends React.Component {

    render() {
        return (
            <Link to={"/juego/" + this.props.id}>
                <div class={"QuizPreview m10 card width-fit-content " + (this.props.isMobile !== true || "mobile")}>
                    <div class="width-fit-content">
                        <img
                            src={this.props.coverJuego ? QuizMasterService.getUrlImagen("cover", this.props.coverJuego) : 'img/gamecover.png'}
                            className="quiz-preview-img"/>
                    </div>
                    <div className="width-fit-content">
                        <p>{this.props.tituloJuego}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default QuizPreview