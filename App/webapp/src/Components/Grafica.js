import React from "react";
//import './Libraries/canvasjs';
import CanvasJSReact from "../Libraries/canvasjs.react";
import QuizMasterService from "../Libraries/QuizMasterServices";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Grafica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idPregunta: this.props.idPregunta,
            idRespuesta: this.props.idRespuesta, //Le suma la que respondio el
            options: {}
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        QuizMasterService.obtenerRespuestaStats({id: this.state.idPregunta}).then(data => {
            //console.log(data);
            let options = {
                title: {
                    text: ""
                },
                data: [{
                    type: "column",
                    indexLabelPlacement: "inside",
                    dataPoints: []
                }]
            };
            var respuestaUsuario = this.state.idRespuesta;
            data.forEach(function (ranking, i) {
                if (ranking === null) {
                    console.log("esta vacio");
                } else {
                    let id = "";
                    let Color = "";
                    if(i === 0) {id = "A"; Color = "blue";}
                    if(i === 1) {id = "B"; Color = "red";}
                    if(i === 2) {id = "C"; Color = "green";}
                    if(i === 3) {id = "D"; Color = "purple";}
                    if(ranking.idRespuesta === respuestaUsuario)
                        ranking.cantidadRespondieron = ranking.cantidadRespondieron+1;

                    var labelInside = id+" ("+ranking.cantidadRespondieron+")";
                    if (ranking.esCorrectoRespuesta === 1){
                        labelInside+= "\n Correcta";
                    }
                    options.data[0].dataPoints.push({
                        label: id,
                        y: ranking.cantidadRespondieron,
                        color: Color,
                        indexLabel: labelInside
                    });
                }
            });
            this.setState({options: options})
        }).catch(error => {console.log(error);})
    }

    render() {
        return (
            <CanvasJSChart options={this.state.options}/>
        );
    }
}
export default Grafica 
