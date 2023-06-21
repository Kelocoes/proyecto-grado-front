import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'

import testset from '../../static/testset.json'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function GraphEstimation (props) {
  // Constants
  const jsonTransformed1 = []
  const jsonTransformed2 = []
  const pointsBackGroundColor1 = []
  const pointsBackGroundColor2 = []

  // Fill arrays for scatter
  for (const object in testset) {
    if (testset[object].color === '#F7B634') {
      const tuple = { x: testset[object].x, y: testset[object].y }
      jsonTransformed1.push(tuple)
      pointsBackGroundColor1.push(testset[object].color)
    } else {
      const tuple = { x: testset[object].x, y: testset[object].y }
      jsonTransformed2.push(tuple)
      pointsBackGroundColor2.push(testset[object].color)
    }
  }

  // Config data for scatter
  const data = {
    datasets: [
      {
        label: 'Pacientes sanos',
        data: jsonTransformed1,
        backgroundColor: pointsBackGroundColor1
      },
      {
        label: 'Pacientes con riesgo',
        data: jsonTransformed2,
        backgroundColor: pointsBackGroundColor2
      },
      {
        label: 'Tú',
        data: [{ x: 322, y: props.estimation }],
        pointRadius: 5,
        backgroundColor: '#0070FF'
      }
    ]
  }

  // Options for chart
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
      }
    }
  }

  return (<Scatter options={options} data={data} />)
}
