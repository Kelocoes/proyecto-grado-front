import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import testset from '../static/testset.json'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);



export default function GraphEstimation(props) {
    
    let jsonTransformado1 = []
    let jsonTransformado2 = []
    let pointsBackGroundColor1 = []
    let pointsBackGroundColor2 = []
    for (let object in testset) {
      if ( testset[object]["color"] === "#F7B634") {
        const objeto = { x: testset[object]["x"], y: testset[object]["y"] }
        jsonTransformado1.push(objeto)
        pointsBackGroundColor1.push(testset[object]["color"])
      } else {
        const objeto = { x: testset[object]["x"], y: testset[object]["y"] }
        jsonTransformado2.push(objeto)
        pointsBackGroundColor2.push(testset[object]["color"])
      }
      
    }
    
    const data = {
        datasets: [
            {
              label: 'Pacientes sanos',
              data: jsonTransformado1,
              backgroundColor: pointsBackGroundColor1
            },
            {
              label: 'Pacientes con riesgo',
              data: jsonTransformado2,
              backgroundColor: pointsBackGroundColor2
              },
            {
              label: 'Tú',
              data: [{x: 322, y: props.estimation}],
              pointRadius: 5,
              backgroundColor: '#0070FF'
            }
        ],
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0.5,
          max: 0.85
        },
        x: {
          min: -5,
          max: Object.keys(testset).length + 5
        },
      },
    };

    return (<Scatter options={options} data={data} />)
};