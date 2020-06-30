import React, { useEffect, useState } from "react";
//import './Libraries/canvasjs';
import CanvasJSReact from "../Libraries/canvasjs.react";
import QuizMasterService from "../Libraries/QuizMasterServices";
import { defaults } from "js-cookie";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function Grafica(props) {
  /*const data = [{"name": "test1"}, {"name": "test2"}];*/

  const [respuesta, set_respuestas] = useState([{}]);
  /* const [juegosBusqueda, set_JuegosBusqueda] = useState([{}]);*/

  /*const [busqueda, setbusqueda] = useState([{}]);*/

  useEffect(() => {
    async function doIt() {
      let data_respuesta = await QuizMasterService.obtenerRespuestaStats({
        id: props.match.params.id,
      });
      await console.log(
        await QuizMasterService.obtenerRespuestaStats({
          id: props.match.params.id,
        })
      );

      await set_respuestas(data_respuesta);
    }
    doIt();
  }, []);

  function render() {



   
      var options1 = {
        /*title: {
                    text: "Pregunta "+PreguntaNumber
                },*/
        data: [
          {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [],
          },
        ],
      };
      
      respuesta.forEach(function (ranking, i) {
       
        if (ranking == !null) {
          console.log("esta vacio");

        } else {
          console.log(Respuesta(ranking, i));
          options1.data[i].dataPoints.push(Respuesta(ranking, i));
        }
      });
   
    
    const options = options1;
    //console.log(options1)
    function Respuesta(ranking, i) {
      //esCorrecta sale de respuesta.esCorrecta y sirve para poner verde el color de la respuesta correcta
//      esCorrecta = true; 
var f = i+1; 
var id = f+"º"+" Respuesta";
     
     var cant = ranking.cantidadRespondieron;
     var Color = "#DD2D4A";
     if (ranking.esCorrecta){
      Color = "#21cb6e";
     }
     return { label: id, y: cant, color: Color }   
    }
    return (
      <div class="container">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }

  return render();
}
export default Grafica 
