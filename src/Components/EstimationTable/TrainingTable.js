import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CachedIcon from '@mui/icons-material/Cached'
import CircularProgress from '@mui/material/CircularProgress'

function CustomToolBarRender (isLoading, setIsLoading,
  reloadInfo, setReloadInfo) {
  return (
    <>
      {isLoading
        ? <IconButton> <CircularProgress color="success" size={20} /> </IconButton>
        : <IconButton color="success"
          onClick={() => {
            setReloadInfo(!reloadInfo)
            setIsLoading(true)
          }}
        >
          <CachedIcon />
        </IconButton>
      }
    </>
  )
}

export default function TrainingTable (props) {
  const {
    response,
    title,
    reloadInfo,
    setReloadInfo
  } = props

  const [isLoading, setIsLoading] = useState(false)

  const columns = [
    'Id', 'Fecha', 'Edad', 'Sexo', 'Peso', 'Altura', 'Diabetes', 'Sistólica',
    'Diastólica', 'Colesterol', 'HDL', 'LDL', 'Triglicéridos', 'Fumador',
    'Antecedentes', 'Estimación', 'Quartil', 'Framingham', 'Descenlace']

  const options = {
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    customToolbar: () => (
      CustomToolBarRender(isLoading, setIsLoading, reloadInfo, setReloadInfo)
    )
  }

  useEffect(() => {
    setIsLoading(false)
  }, [response])

  return (
    <Box
      sx={{
        maxWidth: '1500px'
      }}
    >
      <MUIDataTable
        title={title}
        data={response}
        columns={columns}
        options={options}
      />
    </Box>
  )
}
