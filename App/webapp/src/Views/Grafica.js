import React from 'react'
//import './Libraries/canvasjs';
import CanvasJSReact from '../Libraries/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Grafica extends React.Component {
	render() {
        
        var PreguntaNumber = 9;
        var esMultiple =true;
        var primerValor=12;
        var segundoValor=39;
        var primeraVF= true;//si es la correcta o no
        var segundaVF= false;
        var terceraVF= false;
        var cuartaVF= false;
        var  primeraC = "red";
        var  segundaC = "red";
        var  terceraC = "red";
        var  cuartaC = "red";

       if (primeraVF){
            primeraC = "green"  
        }
        if (segundaVF){
            segundaC = "green"  
        }
        if (terceraVF){
            terceraC = "green"  
        }
        if (cuartaVF){
            cuartaC = "green"  
        }
        if (esMultiple == false){
            var options1 = {
                /*title: {
                    text: "Pregunta "+PreguntaNumber
                },*/
                data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "A",  y:  primerValor, color: primeraC   },
                        { label: "B", y:  segundoValor, color: segundaC}
                    ]
                }
                ]
            }
        }else {
            var tercerValor=14;
        var cuartoValor=2;
            var options1 = {
                /*title: {
                    text: "Pregunta "+PreguntaNumber
                },*/
                data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "A",  y:  primerValor, color: primeraC   },
                        { label: "B", y:  segundoValor, color: segundaC},
                        { label: "C", y:  tercerValor, color: terceraC  },
                        { label: "D",  y: cuartoValor, color: cuartaC  }
                    ]
                }
                ]
            }
        }
        const options = options1;
        
        
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Grafica;   