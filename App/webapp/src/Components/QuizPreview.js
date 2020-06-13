import React from 'react'
import "../Css/QuizPreview.css"

class QuizPreview extends React.Component {
    render() {
        return (
            <div class="QuizPreview m10 card width-fit-content">
                <div class="width-fit-content">
                    <img src="img/perfil.png" className="quiz-preview-img"/>
                </div>
                <div className="width-fit-content">
                    <p>FutbolQuiz</p>
                </div>
            </div>
        )
    }
}

export default QuizPreview