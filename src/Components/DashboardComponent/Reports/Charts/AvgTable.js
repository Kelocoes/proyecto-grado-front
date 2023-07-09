import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function AvgTable (props) {
  const { data } = props
  const columns = ['Severidad', 'Edad', 'Altura', 'Sistólica',
    'Diastólica', 'Colesterol', 'HDL', 'LDL', 'Trigliceridos']

  const options = {
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5]
  }

  return (
    <MUIDataTable
      title={'Promedios'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}
