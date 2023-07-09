import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, ChartDataLabels)

export default function ScatterPatients (props) {
  const { data } = props

  const serializedData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Estimación',
        backgroundColor: '#0070FF',
        borderColor: '#F7B634',
        data: data.values,
        datalabels: {
          display: false
        }
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      plugins: [ChartDataLabels],
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Estimación'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Documentos de identificación'
        }
      }
    }
  }

  return (<Line options={options} data={serializedData} />)
}
