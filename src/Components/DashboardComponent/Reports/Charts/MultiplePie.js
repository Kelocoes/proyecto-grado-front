import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function MultiplePie (props) {
  const { data } = props

  const labels = ['Sexo', 'Diabetes', 'Fumador', 'Antecedentes']
  let colors = [
    '',
    '',
    '#005F73',
    '#94D2BD',
    '#0A9396',
    '#E9D8A6',
    '#94D2BD',
    '#EE9B00',
    '#BB3E03',
    '#005F73'
  ]
  const serializedData = {
    labels: [],
    datasets: data.values.slice(1, data.values.length).map((value, index) => {
      colors = colors.slice(2, colors.length)
      return {
        label: labels[index],
        backgroundColor: [colors[0], colors[1]],
        data: value,
        datalabels: {
          color: 'white',
          align: 'center',
          formatter: (value, context) => {
            if (index === 0) {
              return `${context.dataIndex ? 'M' : 'F'}`
            }
            return `${context.dataIndex ? 'No' : 'Si'}`
          }
        }
      }
    })
  }

  const options = {
    type: 'pie',
    data,
    plugins: [ChartDataLabels],
    options: {
      responsive: true
    }
  }

  return (
    <Pie
      options = {options}
      data = {serializedData}
    />
  )
}
