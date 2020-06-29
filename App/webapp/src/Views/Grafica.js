import React, {useState, useEffect} from 'react'
import QuizMasterService from '../Libraries/QuizMasterServices';
import CanvasJSReact from '../Libraries/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Grafica(props) {
    /*const data = [{"name": "test1"}, {"name": "test2"}];*/

    const [juegos, set_juegos] = useState([{}]);
    const [respuesta, set_respuestas] = useState([{}]);
    /* const [juegosBusqueda, set_JuegosBusqueda] = useState([{}]);*/

    /*const [busqueda, setbusqueda] = useState([{}]);*/

    useEffect(() => {
        async function doIt() {
            let data_respuesta = await QuizMasterService.obtenerRespuestaStats({id: props.match.params.id});
            await console.log(await QuizMasterService.obtenerRespuestaStats({id: props.match.params.id}));

            await set_juegos(data_respuesta);

        }

        doIt()
    }, []);

    function render() {

        var PreguntaNumber = 9;
        var esMultiple = true;
        var primerValor = 12;
        var segundoValor = 39;
        var primeraVF = true;//si es la correcta o no
        var segundaVF = false;
        var terceraVF = false;
        var cuartaVF = false;
        var primeraC = "#DD2D4A";
        var segundaC = "#DD2D4A";
        var terceraC = "#DD2D4A";
        var cuartaC = "#DD2D4A";

        if (primeraVF) {
            primeraC = "#21cb6e"
        }
        if (segundaVF) {
            segundaC = "#21cb6e"
        }
        if (terceraVF) {
            terceraC = "#21cb6e"
        }
        if (cuartaVF) {
            cuartaC = "#21cb6e"
        }
        if (esMultiple === false) {
            var options1 = {
                /*title: {
                    text: "Pregunta "+PreguntaNumber
                },*/
                data: [
                    {
                        // Change type to "doughnut", "line", "splineArea", etc.
                        type: "column",
                        dataPoints: [
                            {label: "A", y: primerValor, color: primeraC},
                            {label: "B", y: segundoValor, color: segundaC}
                        ]
                    }
                ]
            }
        } else {
            var tercerValor = 14;
            var cuartoValor = 2;
            var options1 = {
                /*title: {
                    text: "Pregunta "+PreguntaNumber
                },*/
                data: [
                    {
                        // Change type to "doughnut", "line", "splineArea", etc.
                        type: "column",
                        dataPoints: [
                            {label: "A", y: primerValor, color: primeraC},
                            {label: "B", y: segundoValor, color: segundaC},
                            {label: "C", y: tercerValor, color: terceraC},
                            {label: "D", y: cuartoValor, color: cuartaC}
                        ]
                    }
                ]
            }
        }
        const options = options1;


        return (
            <div class="container">

                <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );

    }

    return render();
}