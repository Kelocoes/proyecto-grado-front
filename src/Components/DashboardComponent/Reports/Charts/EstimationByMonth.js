import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function EstimationByMonth (props) {
  const { data } = props

  const serializedData = {
    labels: data.months,
    datasets: [
      {
        label: 'Estimaciones',
        data: data.amounts,
        backgroundColor: '#00786A',
        datalabels: {
          color: 'white',
          font: {
            size: 15
          }
        }
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    options: {
      scales: {
        xAxes: [{
          barThickness: 1,
          maxBarThickness: 1
        }]
      }
    }
  }

  return (
    <Bar
      options={options}
      data={serializedData}
    />
  )
}
